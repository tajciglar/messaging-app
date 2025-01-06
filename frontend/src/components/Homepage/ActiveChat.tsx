import { useState } from "react";

interface ActiveChatProps {
  activeChat: { chatId: number; receiverId: number } | null;
  chats: {
    id: number;
    name: string;
    messages: { content: string; senderId: number; receiverId: number }[];
  }[];
  addMessage: (chatId: number, message: { content: string; senderId: number; receiverId: number }) => void;
  currentUserId: number;
}

const ActiveChat: React.FC<ActiveChatProps> = ({ activeChat, chats, addMessage, currentUserId }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");

  // Ensure activeChat is not null before attempting to use it
  const handleSend = () => {
    if (currentMessage.trim() && activeChat !== null) {
      addMessage(activeChat.chatId, { content: currentMessage, senderId: currentUserId, receiverId: activeChat.receiverId });
      setCurrentMessage(""); 
    }
  };

  const activeChatData = chats.find((chat) => chat.id === activeChat?.chatId); // Use optional chaining to safely access activeChat properties

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-100">
        {activeChat ? (
          <h2 className="text-xl font-bold"> Chat with {activeChatData?.name}</h2> 
        ) : (
          <p className="text-gray-500 text-center">Select a chat to start messaging</p>
        )}
      </div>
      <div className="flex flex-col m-4">
        {activeChatData && activeChatData.messages.length > 0 ? (
          activeChatData.messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-sm ${
                message.senderId === currentUserId ? 'bg-blue-100 !self-end' : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        )}
      </div>

      <div className="p-4 border-t bg-gray-100">
        <form
          className="flex items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActiveChat;
