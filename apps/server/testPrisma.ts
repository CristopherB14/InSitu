import { prisma } from "./src/prisma";

async function main() {
  const favoritos = await prisma.favorite.findMany();
  console.log("Favoritos:", favoritos);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
