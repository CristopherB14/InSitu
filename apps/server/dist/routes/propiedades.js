"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const router = (0, express_1.Router)();
// Obtener todas las propiedades
router.get("/", async (req, res) => {
    try {
        const propiedades = await prisma_1.prisma.property.findMany();
        res.json(propiedades);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener propiedades" });
    }
});
exports.default = router;
