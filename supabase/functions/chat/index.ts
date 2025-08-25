import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const groqApiKey = Deno.env.get('GROQ_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chatId, messages } = await req.json();
    console.log('Chat request:', { chatId, messageCount: messages?.length });

    if (!chatId) {
      throw new Error('Chat ID is required');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    // Verify chat belongs to user
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('*')
      .eq('id', chatId)
      .eq('userId', user.id)
      .single();

    if (chatError || !chat) {
      throw new Error('Chat not found or access denied');
    }

    let responseText = '';

    if (!groqApiKey) {
      // Mock response when no API key is set
      responseText = 'Hello! I\'m your geospatial AI assistant. I can help you with:\n\n• Analyzing geographic data\n• Searching through your knowledge base\n• Exploring datasets\n• Map interactions and spatial analysis\n\nNote: This is a development response. Please configure your GROQ_API_KEY to enable full AI capabilities.';
    } else {
      // Make request to Groq API
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful geospatial AI assistant for Chat2Geo. You specialize in:
- Geographic information systems (GIS)
- Remote sensing and satellite imagery
- Spatial analysis and mapping
- Geospatial data processing
- OpenStreetMap and open source mapping tools

You can help users analyze geographic data, explore datasets, and work with maps. Be concise but informative, and suggest specific actions when appropriate.`
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!groqResponse.ok) {
        const errorData = await groqResponse.json();
        console.error('Groq API error:', errorData);
        throw new Error(`Groq API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const groqData = await groqResponse.json();
      responseText = groqData.choices[0]?.message?.content || 'I apologize, but I encountered an issue generating a response.';
    }

    // Save assistant message to database
    const { error: insertError } = await supabase
      .from('messages')
      .insert({
        chatId,
        role: 'assistant',
        content: responseText,
      });

    if (insertError) {
      console.error('Error saving message:', insertError);
    }

    // Update user usage count
    await supabase.rpc('increment_usage_count', { user_uuid: user.id });

    return new Response(JSON.stringify({ 
      message: responseText,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});