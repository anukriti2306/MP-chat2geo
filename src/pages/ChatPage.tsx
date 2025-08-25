import { ChatSidebar } from '@/components/layout/ChatSidebar';
import { ChatInterface } from '@/components/chat/ChatInterface';

export const ChatPage = () => {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};