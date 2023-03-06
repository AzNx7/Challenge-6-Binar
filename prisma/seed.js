const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const amjad = await prisma.userGame.upsert({ 
    where: { username: "amjad" },
    update: {},
    create: {
      username: "amjad",
      password: "password",
      userBio: {
        create: {
          age: 25,
          city: "Jakarta",
          gender: "male",
          name: "Amjad",
        },
      },
    },
  });

  const asad = await prisma.userGame.upsert({
    where: {
      username: "asad",
    },
    update: {},
    create: {
      username: "asad",
      password: "password",
      userBio: {
        create: {
          age: 30,
          city: "Jakarta",
          gender: "male",
          name: "As'ad Saleh Umar",
        },
      },
    },
  });

  const marco = await prisma.userGame.upsert({
    where: {
      username: "marco",
    },
    update: {},
    create: {
      username: "marco",
      password: "password",
      userBio: {
        create: {
          age: 24,
          city: "Bali",
          gender: "male",
          name: "Marco Polo",
        },
      },
    },
  });

  const angel = await prisma.userGame.upsert({
    where: {
      username: "angel",
    },
    update: {},
    create: {
      username: "angel",
      password: "password",
      userBio: {
        create: {
          age: 24,
          city: "Jakarta",
          gender: "female",
          name: "Angelyn",
        },
      },
    },
  });

  console.log({ amjad, asad, marco, angel });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });