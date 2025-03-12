import { useState } from "react";

interface AllChatsProps {
  setActiveChat: (id: number, receiverId: number) => void;
  chats: { id: number; name: string; messages: { content: string; receiverId: number }[] }[];
}

const AllChats: React.FC<AllChatsProps> = ({ setActiveChat, chats }) => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  const handleChatClick = (chatId: number, receiverId: number) => {
    setActiveChat(chatId, receiverId);
    setActiveChatId(chatId);
  };

  return (
    <div className="w-full h-full">
      <h2 className="p-4 text-lg font-bold">Chats</h2>
      {chats.length === 0 ? (
        <p className="p-4 text-gray-500">No chats available</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {chats.map((chat) => {
            const receiverId = chat.messages[0]?.receiverId ?? 0;
            return (
              <li
                key={chat.id}
                onClick={() => handleChatClick(chat.id, receiverId)}
                className={`p-4 cursor-pointer ${
                  activeChatId === chat.id ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                {chat.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AllChats;
