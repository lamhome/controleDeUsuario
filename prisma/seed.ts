import { PrismaClient } from '@prisma/client';
import { hash } from "bcryptjs";

const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.userType.createMany({
    data: [
      { name: 'Administrador', user_default: false, admin_default: true },
      { name: 'Usuário', user_default: true, admin_default: false },
    ]
  });

  await prismaClient.userAction.createMany({
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

  const password = "123456" as string

  const passwordHash = await hash(password, 8);

  const defaultType = await prismaClient.userType.findFirst({
    where: {
      admin_default: true
    },
    select: {
      id: true
    }
  });

  if (defaultType && defaultType.id) {
    await prismaClient.user.createMany({
      data: [
        { 
          name: 'Luciano Angelo de Meneses', 
          email: 'luciano9675@gmail.com', 
          password: passwordHash,  
          type_id: defaultType.id, 
          image: "171549900.gif" 
        }
      ]
    });
  } else {
    console.error('Default user type not found');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
