const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to generate random message content
function generateRandomMessage() {
  const messages = [
    'Hey, what\'s up?',
    'Let\'s meet up tomorrow!',
    'Did you see the game last night?',
    'I\'m free this weekend, let\'s hang out!',
    'What do you think about the new movie?',
    'Can you send me the document?',
    'I\'ve got a new project, want to collaborate?',
    'Let\'s grab some coffee soon.',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

async function seed() {
  // Ensure the user "Taj" exists
  const tajUser = await prisma.user.upsert({
    where: { email: 'taj.brzovic@gmail.com' },
    update: {},  // No update if it exists
    create: {
      name: 'Taj',
      email: 'taj.brzovic@gmail.com',
      password: 'password123',  // Use a secure hash in a real app
    },
  });

  console.log('User "Taj" created or already exists:', tajUser.name);

  // Create some random users to message with
  const randomUsers = [
    { name: 'John Doe', email: 'john.doe@gmail.com' },
    { name: 'Jane Smith', email: 'jane.smith@gmail.com' },
    { name: 'Mike Johnson', email: 'mike.johnson@gmail.com' },
    { name: 'Sarah Lee', email: 'sarah.lee@gmail.com' },
    { name: 'Emma Brown', email: 'emma.brown@gmail.com' },
  ];

  const createdUsers = await Promise.all(
    randomUsers.map(async (user) => {
      return await prisma.user.upsert({
        where: { email: user.email },
        update: {},  // No update if it exists
        create: user,
      });
    })
  );

  console.log('Random users created or already exist:', createdUsers.map(user => user.name).join(', '));

  // Now create some random messages between Taj and the random users
  const usersToMessage = [tajUser, ...createdUsers]; // Include Taj and the random users
  
  for (const user of usersToMessage) {
    if (user.id !== tajUser.id) {  // Ensure Taj doesn't send a message to themselves
      // Randomly send 5 messages between Taj and another user
      for (let i = 0; i < 5; i++) {
        await prisma.message.create({
          data: {
            content: generateRandomMessage(),
            senderId: tajUser.id,
            receiverId: user.id,
          },
        });

        await prisma.message.create({
          data: {
            content: generateRandomMessage(),
            senderId: user.id,
            receiverId: tajUser.id,
          },
        });
      }
      console.log(`Created random messages between Taj and ${user.name}`);
    }
  }

  await prisma.$disconnect();
}

seed()
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
