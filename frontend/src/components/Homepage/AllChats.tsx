interface AllChatsProps {
  setActiveChat: (id: number, receiverId: number) => void; 
  chats: { id: number; name: string; messages: { content: string; receiverId: number }[] }[];
}

const AllChats: React.FC<AllChatsProps> = ({ setActiveChat, chats }) => {
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
                onClick={() => setActiveChat(chat.id, receiverId)} 
                className="p-4 hover:bg-gray-100 cursor-pointer"
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
