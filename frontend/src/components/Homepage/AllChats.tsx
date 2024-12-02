interface AllChatsProps {
  setActiveChat: (name: string) => void;
  chats: { id: number; name: string; messages: { content: string }[] }[]; 
}

const AllChats: React.FC<AllChatsProps> = ({ setActiveChat, chats }) => {

 
  return (
    <div className="w-full h-full">
      <h2 className="p-4 text-lg font-bold">Chats</h2>
      {chats.length === 0 ? (
        <p className="p-4 text-gray-500">No chats available</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setActiveChat(chat.name)}
              className="p-4 hover:bg-gray-100 cursor-pointer"
            >
              {chat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllChats;
