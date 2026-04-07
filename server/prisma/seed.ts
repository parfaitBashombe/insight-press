import { prisma } from "../src/database/system/db.js";

async function main() {
  console.log("Seeding roles...");

  const roles = [
    { name: "READER", description: "Standard user that can read articles" },
    { name: "WRITER", description: "User that can write and publish articles" },
    { name: "ADMIN", description: "Administrator with full access" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  console.log("Roles seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
