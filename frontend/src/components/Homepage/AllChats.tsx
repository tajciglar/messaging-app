interface AllChatsProps {
  setActiveChat: (name: string) => void; 
}

const AllChats: React.FC<AllChatsProps> = ({ setActiveChat }) => {
  const chats = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  return (
    <div className="w-full h-full">
      <h2 className="p-4 text-lg font-bold">Chats</h2>
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
    </div>
  );
};

export default AllChats;
