import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // borrar datos previos
  await prisma.sale.deleteMany().catch(() => {});
  await prisma.favorite.deleteMany().catch(() => {});
  await prisma.propertyPhoto.deleteMany().catch(() => {});
  await prisma.property.deleteMany().catch(() => {});
  await prisma.client.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});
  await prisma.inmobiliaria.deleteMany().catch(() => {});

  // Crear inmobiliaria
  const inmo = await prisma.inmobiliaria.create({
    data: {
      name: "Inmobiliaria Demo",
      address: "Av. Demo 123",
    },
  });

  // Crear usuarios
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
      password: await bcrypt.hash("agentpass", 10),
      role: "AGENT",
      inmobiliariaId: inmo.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Usuario Demo",
      email: "user@demo.com",
      password: await bcrypt.hash("userpass", 10),
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

  // ------------------------------------
  // Crear 5 propiedades
  // ------------------------------------
  const propiedades = await prisma.property.createMany({
    data: [
      {
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
      },
      {
        title: "Casa moderna en Olivos",
        description: "Casa de 4 ambientes con jardín y pileta.",
        price: 280000,
        type: "HOUSE",
        operation: "SALE",
        address: "Gral. Paz 567",
        city: "Buenos Aires",
        country: "Argentina",
        m2_total: 200,
        m2_covered: 150,
        bedrooms: 3,
        bathrooms: 2,
        amenities: "jardin,pileta,cochera",
        status: "PUBLISHED",
        publishedAt: new Date(),
        inmobiliariaId: inmo.id,
        agentId: agent.id,
      },
      {
        title: "Monoambiente en Recoleta",
        description: "Ideal estudiantes. A metros del subte.",
        price: 85000,
        type: "DEPARTMENT",
        operation: "SALE",
        address: "Av. Santa Fe 3200",
        city: "Buenos Aires",
        country: "Argentina",
        m2_total: 32,
        m2_covered: 32,
        bedrooms: 1,
        bathrooms: 1,
        amenities: "ascensor,apto profesional",
        status: "PUBLISHED",
        publishedAt: new Date(),
        inmobiliariaId: inmo.id,
        agentId: agent.id,
      },
      {
        title: "PH con terraza en Villa Urquiza",
        description: "Amplio PH con terraza privada y parrilla.",
        price: 195000,
        type: "PH",
        operation: "SALE",
        address: "Av. Triunvirato 4500",
        city: "Buenos Aires",
        country: "Argentina",
        m2_total: 120,
        m2_covered: 100,
        bedrooms: 3,
        bathrooms: 2,
        amenities: "terraza,parrilla",
        status: "PUBLISHED",
        publishedAt: new Date(),
        inmobiliariaId: inmo.id,
        agentId: agent.id,
      },
      {
        title: "Oficina equipada en Microcentro",
        description: "Oficina lista para mudarte. Seguridad 24 hs.",
        price: 1500,
        type: "OFFICE",
        operation: "RENT",
        address: "Florida 500",
        city: "Buenos Aires",
        country: "Argentina",
        m2_total: 45,
        m2_covered: 45,
        bedrooms: 0,
        bathrooms: 1,
        amenities: "seguridad 24hs,aire acondicionado",
        status: "PUBLISHED",
        publishedAt: new Date(),
        inmobiliariaId: inmo.id,
        agentId: agent.id,
      },
    ],
  });

  console.log("✅ Seed completada con éxito");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
