import { Message } from "@/services/websocketService";
import useUserStore from "@/hooks/useUserStore";

export default function MessageBubble({ message }: { message: Message }) {
  const { user } = useUserStore((state) => state);
  const isOwnMessage = message.sender === user?.username;

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwnMessage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.sent_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

