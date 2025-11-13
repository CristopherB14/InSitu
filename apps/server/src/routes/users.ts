// src/routes/users.ts
import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * 📋 Obtener todos los usuarios
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error("❌ Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

/**
 * ➕ Crear un usuario
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password, role, name, inmobiliariaId } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        role: role || "USER",
        name: name || email, // si no envías nombre, usamos email
        inmobiliariaId: inmobiliariaId || null,
      },
    });

    res.status(201).json(newUser);
  } catch (err: any) {
    console.error("❌ Error al crear usuario:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🗑️ Eliminar usuario
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
