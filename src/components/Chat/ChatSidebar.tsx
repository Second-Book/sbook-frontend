"use client";

interface Conversation {
  username: string;
  lastMessage: string;
  unread: number;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeChat: string | null;
  onSelectChat: (username: string) => void;
}

export default function ChatSidebar({
  conversations,
  activeChat,
  onSelectChat,
}: ChatSidebarProps) {
  return (
    <div className="w-64 border-r overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg">Conversations</h3>
      </div>
      <div>
        {conversations.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">
            No conversations yet
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.username}
              onClick={() => onSelectChat(conv.username)}
              className={`w-full text-left p-4 border-b hover:bg-gray-50 ${
                activeChat === conv.username ? 'bg-blue-50' : ''
              }`}
            >
              <div className="font-medium">{conv.username}</div>
              <div className="text-sm text-gray-600 truncate">{conv.lastMessage}</div>
              {conv.unread > 0 && (
                <span className="inline-block mt-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {conv.unread}
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

