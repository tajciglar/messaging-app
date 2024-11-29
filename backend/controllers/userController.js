const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getChats (req, res) {
    const userId = req.userId;
    console.log("in")
    const chats = await prisma.user.findMany({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            messages: {
                select: {
                    receiverId: true,
                    content: true,
                    receiver: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return res.status(201).json(chats)
}

module.exports = {
    getChats,
}

