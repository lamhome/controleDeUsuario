import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.createMany({
    data: [
      { name: 'Administrador' },
      { name: 'Usuário' },
    ]
  });

  await prisma.userAction.createMany({
    data: [
      { name: 'User created' },
      { name: 'User actived' },
      { name: 'User inactived' },
      { name: 'User changed' },
      { name: 'User Logon' },
      { name: 'User Logoff' },
      { name: 'Password change requirement' },
      { name: 'Changed password' },
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });