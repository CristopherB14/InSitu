"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
// Registro de usuario
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    try {
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "El correo ya está registrado" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma_1.prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        res.status(201).json({ message: "Usuario creado exitosamente", userId: newUser.id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error del servidor" });
    }
});
// Login de usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email y contraseña requeridos" });
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado" });
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).json({ message: "Contraseña incorrecta" });
        // Para esta primera versión sin JWT, devolvemos info básica
        res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error del servidor" });
    }
});
exports.default = router;
