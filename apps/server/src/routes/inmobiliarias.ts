import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * 📋 Obtener todas las inmobiliarias
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const inmobiliarias = await prisma.inmobiliaria.findMany({
      include: {
        properties: true,
        users: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(inmobiliarias);
  } catch (error) {
    console.error("❌ Error al obtener inmobiliarias:", error);
    res.status(500).json({ error: "Error al obtener inmobiliarias" });
  }
});

/**
 * 🔍 Obtener una inmobiliaria por ID
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const inmobiliaria = await prisma.inmobiliaria.findUnique({
      where: { id },
      include: { properties: true, users: true },
    });

    if (!inmobiliaria) {
      return res.status(404).json({ error: "Inmobiliaria no encontrada" });
    }

    res.json(inmobiliaria);
  } catch (error) {
    console.error("❌ Error al obtener inmobiliaria:", error);
    res.status(500).json({ error: "Error al obtener inmobiliaria" });
  }
});

/**
 * ➕ Crear una nueva inmobiliaria
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    // Verificar si ya existe una inmobiliaria con el mismo nombre (sin distinguir mayúsculas/minúsculas)
    const existing = await prisma.inmobiliaria.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: "insensitive",
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Ya existe una inmobiliaria con ese nombre" });
    }

    const nueva = await prisma.inmobiliaria.create({
      data: { name: name.trim(), address: address || null },
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error("❌ Error al crear inmobiliaria:", error);
    res.status(500).json({ error: "Error al crear inmobiliaria" });
  }
});

/**
 * ✏️ Actualizar una inmobiliaria
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const updated = await prisma.inmobiliaria.update({
      where: { id },
      data: { name, address },
    });

    res.json(updated);
  } catch (error) {
    console.error("❌ Error al actualizar inmobiliaria:", error);
    res.status(500).json({ error: "Error al actualizar inmobiliaria" });
  }
});

/**
 * 🗑️ Eliminar una inmobiliaria
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.inmobiliaria.delete({ where: { id } });
    res.json({ message: "Inmobiliaria eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar inmobiliaria:", error);
    res.status(500).json({ error: "Error al eliminar inmobiliaria" });
  }
});

export default router;
