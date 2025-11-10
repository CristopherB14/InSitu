import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ======================================
   🧑‍💼 USUARIOS
====================================== */

// Obtener todos los usuarios (excepto passwords)
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        inmobiliaria: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Cambiar rol de un usuario
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ error: "Error al actualizar rol" });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

/* ======================================
   🏠 PROPIEDADES
====================================== */

// Listar todas las propiedades con agente e inmobiliaria
export const getAllProperties = async (_req: Request, res: Response) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        agent: { select: { id: true, name: true, email: true } },
        inmobiliaria: { select: { id: true, name: true } },
        sale: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(properties);
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    res.status(500).json({ error: "Error al obtener propiedades" });
  }
};

// Crear una nueva propiedad
export const createProperty = async (req: Request, res: Response) => {
  try {
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
      latitude,
      longitude,
      inmobiliariaId,
      agentId,
    } = req.body;

    const property = await prisma.property.create({
      data: {
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
        latitude,
        longitude,
        inmobiliariaId,
        agentId,
        status: "DRAFT",
      },
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("Error al crear propiedad:", error);
    res.status(500).json({ error: "Error al crear propiedad" });
  }
};

// Eliminar propiedad
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.property.delete({ where: { id } });
    res.json({ message: "Propiedad eliminada" });
  } catch (error) {
    console.error("Error al eliminar propiedad:", error);
    res.status(500).json({ error: "Error al eliminar propiedad" });
  }
};

/* ======================================
   💰 VENTAS
====================================== */

// Listar todas las ventas con detalle de propiedad y cliente
export const getAllSales = async (_req: Request, res: Response) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        property: { select: { title: true, price: true } },
        agent: { select: { name: true } },
        client: { select: { name: true, email: true } },
      },
      orderBy: { date: "desc" },
    });
    res.json(sales);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

// Crear una nueva venta
export const createSale = async (req: Request, res: Response) => {
  try {
    const { propertyId, agentId, clientId, price, notes } = req.body;

    const sale = await prisma.sale.create({
      data: {
        propertyId,
        agentId,
        clientId,
        price,
        notes,
      },
    });

    // Actualizar estado de la propiedad
    await prisma.property.update({
      where: { id: propertyId },
      data: { status: "ARCHIVED" },
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ error: "Error al crear venta" });
  }
};
