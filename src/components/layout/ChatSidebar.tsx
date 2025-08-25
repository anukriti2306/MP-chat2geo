import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, MessageCircle, MoreHorizontal, LogOut, User, Settings, MapPin, FileText, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Chat = Tables<'chats'>;

export const ChatSidebar = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const fetchChats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('userId', user.id)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const createNewChat = async () => {
    if (!user || loading) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert({
          userId: user.id,
          chatTitle: 'New Chat',
        })
        .select()
        .single();

      if (error) throw error;

      setChats(prev => [data, ...prev]);
      navigate(`/chat/${data.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
      toast({
        variant: "destructive",
        title: "Failed to create chat",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Button 
          onClick={createNewChat} 
          className="w-full" 
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Chats List */}
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={chatId === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate text-sm">
                {chat.chatTitle || 'New Chat'}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Navigation */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate('/knowledge-base')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Knowledge Base
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate('/datasets')}
        >
          <Database className="mr-2 h-4 w-4" />
          Datasets
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate('/map')}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Map
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate('/reports')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Reports
        </Button>
      </div>

      {/* User Menu */}
      <div className="p-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span className="text-sm truncate">
                  {user?.email}
                </span>
              </div>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};