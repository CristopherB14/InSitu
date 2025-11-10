import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * 📄 Obtener todas las propiedades
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const propiedades = await prisma.property.findMany({
      include: {
        agent: true,
        inmobiliaria: true,
      },
    });
    res.json(propiedades);
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    res.status(500).json({ error: "Error al obtener propiedades" });
  }
});

/**
 * 🔍 Obtener una propiedad por ID
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const propiedad = await prisma.property.findUnique({
      where: { id },
      include: { agent: true, inmobiliaria: true },
    });

    if (!propiedad)
      return res.status(404).json({ error: "Propiedad no encontrada" });

    res.json(propiedad);
  } catch (error) {
    console.error("Error al obtener propiedad:", error);
    res.status(500).json({ error: "Error al obtener propiedad" });
  }
});

/**
 * ➕ Crear una nueva propiedad
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("📥 Datos recibidos:", req.body);

    const {
      title,
      description,
      price,
      type,
      operation,
      address,
      city,
      country,
      m2_total,
      m2_covered,
      bedrooms,
      bathrooms,
      amenities,
      inmobiliariaId,
      agentId,
    } = req.body;

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price: Number(price),
        type,
        operation,
        address,
        city,
        country,
        m2_total: m2_total ? Number(m2_total) : null,
        m2_covered: m2_covered ? Number(m2_covered) : null,
        bedrooms: bedrooms ? Number(bedrooms) : null,
        bathrooms: bathrooms ? Number(bathrooms) : null,
        amenities,
        inmobiliariaId,
        agentId,
      },
    });

    console.log("✅ Propiedad creada:", newProperty);
    res.status(201).json(newProperty);
  } catch (error: any) {
    console.error("❌ Error al crear propiedad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * ✏️ Actualizar una propiedad existente
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.property.update({
      where: { id },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar propiedad:", error);
    res.status(500).json({ error: "Error al actualizar propiedad" });
  }
});

/**
 * 🗑️ Eliminar una propiedad
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.property.delete({ where: { id } });
    res.json({ message: "Propiedad eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar propiedad:", error);
    res.status(500).json({ error: "Error al eliminar propiedad" });
  }
});

export default router;
