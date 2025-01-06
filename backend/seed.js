import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Hash admin password
  const hashedPass = await bcrypt.hash('admin123', 10);

  // Create the Admin account
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPass,
      name: 'Admin User',
    },
  });

  console.log('Admin user created:', admin);

  // Create 10 random users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: await bcrypt.hash('password123', 10), // Always hash passwords
          name: faker.name.fullName(),
        },
      });
      console.log('Created user:', user);
      return user;
    })
  );

  // Create chats and messages for each user with the admin
  await Promise.all(
    users.map(async (user) => {
      const chat = await prisma.chat.create({
        data: {
          name: user.name,
          participants: {
            connect: [{ id: admin.id }, { id: user.id }],
          },
        },
      });

      console.log('Chat created:', chat);

      // Create messages between admin and the user
      await prisma.message.createMany({
        data: [
          {
            content: 'Hello!',
            senderId: admin.id,
            receiverId: user.id,
            chatId: chat.id,
          },
          {
            content: 'Hi there!',
            senderId: user.id,
            receiverId: admin.id,
            chatId: chat.id,
          },
        ],
      });

      console.log(`Messages created for chat with user ${user.name}`);
    })
  );

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
