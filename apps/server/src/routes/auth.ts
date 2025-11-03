import { Router, Request, Response } from "express";
import { prisma } from "../prisma"; 
import bcrypt from "bcryptjs";

const router = Router();

// Registro de usuario
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ message: "Usuario creado exitosamente", userId: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Login de usuario
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email y contraseña requeridos" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Para esta primera versión sin JWT, devolvemos info básica
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
