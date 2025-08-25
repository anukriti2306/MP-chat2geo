import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, MessageCircle, Database, MapPin, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Globe className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Chat2Geo</h1>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Geospatial Intelligence Made Simple
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transform your geospatial analysis with AI-powered conversations. 
            Upload documents, explore datasets, and interact with maps through natural language.
          </p>
          
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => navigate('/chat')}
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="p-6 rounded-lg border bg-card text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Chat</h3>
            <p className="text-muted-foreground">
              Natural language conversations about your geospatial data
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
            <p className="text-muted-foreground">
              Upload and search through your documents with AI
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-center">
            <Database className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Datasets</h3>
            <p className="text-muted-foreground">
              Explore geospatial datasets and remote sensing data
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interactive Maps</h3>
            <p className="text-muted-foreground">
              Visualize and analyze spatial data on interactive maps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
