import { useState } from "react";

interface ActiveChatProps {
  activeChat: string | null;
  chats: { id: number; name: string; messages: { content: string }[] }[]; 
  addMessage: (chatName: string, message: string) => void; 
}

const ActiveChat: React.FC<ActiveChatProps> = ({ activeChat, chats, addMessage }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleSend = () => {
    if (currentMessage.trim() && activeChat) {
      addMessage(activeChat, currentMessage); // Add the message via parent function
      setCurrentMessage(""); // Clear the input after sending
    }
  };

  // Get the active chat object
  const activeChatData = chats.find((chat) => chat.name === activeChat);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-100">
        {activeChat ? (
          <h2 className="text-xl font-bold">{activeChat}</h2>
        ) : (
          <p className="text-gray-500 text-center">Select a chat to start messaging</p>
        )}
      </div>

      <div className="flex-grow p-4 overflow-y-auto bg-white">
        {activeChatData && activeChatData.messages.length > 0 ? (
          <ul className="space-y-2">
            {activeChatData.messages.map((message, index) => (
              <li key={index} className="bg-blue-100 text-blue-800 p-2 rounded-md max-w-sm">
                {message.content}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            No messages yet. Start the conversation!
          </p>
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
