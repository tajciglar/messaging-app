const AllChats: React.FC = () => {
    const chats = [
        {id: 1, name: "John DOe"},
        {id: 2, name: "Jane SMith"},
    ];

    return (
        <div>
            <h2 className="p-4 text-lg font-bold"></h2>
            <ul>
                {chats.map((chat) => (
                    <li key={chat.id} className="p-4 hover:bg-gray-100">
                        {chat.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllChats;