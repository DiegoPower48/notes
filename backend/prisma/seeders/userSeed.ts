import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'admin123';
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExists) {
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name: 'Administrator',
        email,
        password: hashedPassword,
      },
    });

    console.log('✅ Admin user created');
  } else {
    console.log('The user already exists, no new user was created');
  }
}

main()
  .catch((e) => {
    console.error('Error while creating the user:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
