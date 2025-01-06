const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getChats(req, res) {
    const userId = req.userId;

    try {
        // Fetch the chats the user is part of
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: userId,  // Checking if the user is a participant in the chat
                    },
                },
            },
            select: {
                id: true,
                name: true,  // Chat name (can be null for 1-on-1 chats)
                messages: {
                    select: {
                        id: true,
                        content: true,
                        senderId: true,
                        receiverId: true,
                        createdAt: true,
                        sender: {
                            select: {
                                name: true,
                            },
                        },
                        receiver: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                participants: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return res.status(200).json(chats);
    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({ message: "Failed to fetch chats" });
    }
}


async function setMessage(req, res) {
    const { chatId, content, senderId, receiverId } = req.body;

    try {
        // Create the new message
        const newMessage = await prisma.message.create({
            data: {
                content,
                senderId,
                receiverId, 
                chatId,     
            },
        });

        return res.status(201).json(newMessage); 
    } catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ message: "Failed to create message" });
    }
}


module.exports = {
    getChats,
    setMessage,
}

