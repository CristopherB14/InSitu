import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

// Obtener todas las propiedades
router.get("/", async (req: Request, res: Response) => {
  try {
    const propiedades = await prisma.property.findMany();
    res.json(propiedades);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener propiedades" });
  }
});

export default router;
