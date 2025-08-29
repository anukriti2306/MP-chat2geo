import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import { ChatPage } from "./pages/ChatPage";
import { MapPage } from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import './index.css';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        {/* Toasts */}
        <Toaster />
        <Sonner />

        {/* Main app container with dark mode */}
        <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-900 dark:text-white">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/chat/:chatId?" 
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/map" 
                element={
                  <ProtectedRoute>
                    <MapPage />
                  </ProtectedRoute>
                } 
              />
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
