import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  // Create random users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.name.fullName(),
        },
      })
    )
  );

  // Create random messages between users
  for (let i = 0; i < 20; i++) {
    const sender = users[Math.floor(Math.random() * users.length)];
    const receiver = users[Math.floor(Math.random() * users.length)];

    // Avoid sending a message to self
    if (sender.id !== receiver.id) {
      await prisma.message.create({
        data: {
          content: faker.lorem.sentence(),
          senderId: sender.id,
          receiverId: receiver.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
