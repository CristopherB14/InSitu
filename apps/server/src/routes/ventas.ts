// src/routes/ventas.ts
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * 📋 Obtener todas las ventas
 */
router.get("/", async (req, res) => {
  try {
    const ventas = await prisma.sale.findMany({
      include: {
        property: true,
        agent: true,
        client: true,
      },
      orderBy: { date: "desc" },
    });
    res.json(ventas);
  } catch (err) {
    console.error("❌ Error al obtener ventas:", err);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
});

/**
 * ➕ Crear una venta
 */
router.post("/", async (req, res) => {
  try {
    const { propertyId, agentId, clientId, price, notes } = req.body;

    console.log("POST /ventas - Datos recibidos:", req.body);

    if (!propertyId || !agentId || !clientId || !price) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newSale = await prisma.sale.create({
      data: {
        propertyId,
        agentId,
        clientId,
        price: Number(price), // si es Decimal, cambiar a new Prisma.Decimal(price)
        notes: notes || null,
      },
    });

    res.status(201).json(newSale);
  } catch (err) {
    console.error("❌ Error al crear venta:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Error al crear venta" });
  }
});

/**
 * 🗑️ Eliminar venta
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sale.delete({ where: { id } });
    res.json({ message: "Venta eliminada correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar venta:", err);
    res.status(500).json({ error: "Error al eliminar venta" });
  }
});

export default router;
