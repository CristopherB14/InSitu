import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // borrar datos previos (opcional en dev)
  await prisma.sale.deleteMany().catch(() => {});
  await prisma.favorite.deleteMany().catch(() => {});
  await prisma.propertyPhoto.deleteMany().catch(() => {});
  await prisma.property.deleteMany().catch(() => {});
  await prisma.client.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});
  await prisma.inmobiliaria.deleteMany().catch(() => {});

  // Crear una inmobiliaria
  const inmo = await prisma.inmobiliaria.create({
    data: {
      name: "Inmobiliaria Demo",
      address: "Av. Demo 123",
    },
  });

  // Crear usuarios: admin, agente, usuario común
  const admin = await prisma.user.create({
    data: {
      name: "Admin Demo",
      email: "admin@demo.com",
      password: await bcrypt.hash("adminpass", 10),
      role: "ADMIN",
    },
  });

  const agent = await prisma.user.create({
    data: {
      name: "Agente Demo",
      email: "agent@demo.com",
      password: "agentpass",
      role: "AGENT",
      inmobiliariaId: inmo.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Usuario Demo",
      email: "user@demo.com",
      password: "userpass",
      role: "USER",
    },
  });

  // Crear cliente
  const client = await prisma.client.create({
    data: {
      name: "Cliente Demo",
      email: "cliente@demo.com",
      phone: "+54 9 11 0000 0000",
    },
  });

  // Crear una propiedad
  const prop = await prisma.property.create({
    data: {
      title: "Departamento 2 amb en Palermo",
      description: "Luminoso, cerca de todo. Excelente estado.",
      price: 120000,
      type: "DEPARTMENT",
      operation: "SALE",
      address: "Av. Cabildo 1234",
      city: "Buenos Aires",
      country: "Argentina",
      m2_total: 80,
      m2_covered: 65,
      bedrooms: 2,
      bathrooms: 1,
      amenities: "balcon,ascensor",
      status: "PUBLISHED",
      publishedAt: new Date(),
      inmobiliariaId: inmo.id,
      agentId: agent.id,
      photos: {
        create: [
          { path: "/uploads/propiedades/demo-1.jpg", sort: 0 },
          { path: "/uploads/propiedades/demo-2.jpg", sort: 1 },
        ],
      },
    },
    include: { photos: true },
  });

  // Usuario marca favorito
  await prisma.favorite.create({
    data: {
      userId: user.id,
      propertyId: prop.id,
    },
  });

  // Crear una venta (ejemplo)
  await prisma.sale.create({
    data: {
      propertyId: prop.id,
      agentId: agent.id,
      clientId: client.id,
      price: 120000,
      notes: "Venta de ejemplo creada por seed",
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
