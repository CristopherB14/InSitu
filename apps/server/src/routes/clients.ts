// src/routes/clients.ts
import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * 📋 Obtener todos los clientes
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(clients);
  } catch (err) {
    console.error("❌ Error al obtener clientes:", err);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

/**
 * ➕ Crear un cliente
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    // Verificamos si el email ya existe
    if (email) {
      const existing = await prisma.client.findUnique({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: "Cliente con este email ya existe" });
      }
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
      },
    });

    res.status(201).json(newClient);
  } catch (err: any) {
    console.error("❌ Error al crear cliente:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🗑️ Eliminar cliente
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.client.delete({ where: { id } });
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar cliente:", err);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
});

export default router;
