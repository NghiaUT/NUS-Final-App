import prisma from './config/prisma/prisma.init.js';

async function main() {
  const users = await prisma.photo.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
