// import { Router } from "express";
// import { prisma } from "../prisma";

// const router = Router();

// // Para testing, usamos un userId fijo
// const TEST_USER_ID = "Admin Demo"; // reemplazar con el id real de tu seed

// // Obtener favoritos del usuario
// router.get("/", async (req, res) => {
//   const userId = TEST_USER_ID;
//   const favorites = await prisma.favorite.findMany({
//     where: { userId },
//     include: { property: true },
//   });
//   res.json(favorites);
// });

// // Agregar favorito
// router.post("/:propertyId", async (req, res) => {
//   const userId = TEST_USER_ID;
//   const { propertyId } = req.params;

//   try {
//     const favorite = await prisma.favorite.create({ data: { userId, propertyId } });
//     res.json(favorite);
//   } catch (err) {
//     res.status(400).json({ error: "Ya existe en favoritos o propiedad inválida" });
//   }
// });

// // Eliminar favorito
// router.delete("/:propertyId", async (req, res) => {
//   const userId = TEST_USER_ID;
//   const { propertyId } = req.params;

//   try {
//     await prisma.favorite.delete({ where: { userId_propertyId: { userId, propertyId } } });
//     res.json({ message: "Eliminado de favoritos" });
//   } catch (err) {
//     res.status(400).json({ error: "No existe en favoritos" });
//   }
// });

// export default router;
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// Obtener favoritos del usuario
router.get("/", async (req, res) => {
  const { userId } = req.query;

  const favorites = await prisma.favorite.findMany({
    where: { userId: String(userId) },
    include: { property: true },
  });
  res.json(favorites);
});

// Agregar favorito
router.post("/", async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    const favorite = await prisma.favorite.create({
      data: { userId, propertyId },
    });
    res.json(favorite);
  } catch (err) {
    res.status(400).json({ error: "Ya existe en favoritos o propiedad inválida" });
  }
});

// Eliminar favorito
router.delete("/:propertyId", async (req, res) => {
  const { userId } = req.query;
  const { propertyId } = req.params;

  try {
    await prisma.favorite.delete({
      where: { userId_propertyId: { userId: String(userId), propertyId } },
    });
    res.json({ message: "Eliminado de favoritos" });
  } catch (err) {
    res.status(400).json({ error: "No existe en favoritos" });
  }
});

export default router;
