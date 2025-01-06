import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  // Create the Admin account
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'admin123', // In a real app, hash the password
      name: 'Admin User',
    },
  });

  // Create 10 random users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: 'password123', // In a real app, hash the password
        name: faker.name.findName(),
      },
    });
    users.push(user);
  }

  // Create chats for the admin with each user
  for (const user of users) {
    const chat = await prisma.chat.create({
      data: {
        name: `Chat with ${user.name}`,
        participants: {
          connect: [{ id: admin.id }, { id: user.id }],
        },
      },
    });

    // Create messages between the admin and the user (one example message)
    await prisma.message.create({
      data: {
        content: 'Hello!',
        senderId: admin.id,
        receiverId: user.id,
        chatId: chat.id,
      },
    });

    await prisma.message.create({
      data: {
        content: 'Hi there!',
        senderId: user.id,
        receiverId: admin.id,
        chatId: chat.id,
      },
    });
  }

  console.log('Database has been reset and seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
