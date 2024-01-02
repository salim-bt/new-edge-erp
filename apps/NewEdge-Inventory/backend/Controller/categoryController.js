import { json } from "express";
import prisma from "../DB/db.config.js";

//CATEGORY
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  const newCategory = await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });
  return res.json({ status: 200, data: newCategory, msg: "Category Created" });
};

export const fetchCategories = async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      item: {
        orderBy: {
          name: "asc",
        },
      }
    },
    
  });
  return res.json({ status: 200, data: categories });
};

export const fetchCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
    },
    include: {
      item: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });
  return res.json({ status: 200, data: category });
};

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  const category = await prisma.category.update({
    where: {
      id: Number(categoryId),
    },
    data: {
      name: name,
      description: description,
    },
  });
  res.json({
    status: 200,
    data: category,
    message: "Category update sucessfull!",
  });
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  await prisma.category.delete({
    where: {
      id: Number(categoryId),
    },
  });
  return res.json({ status: 200, message: "Category deleted successfully" });
}

//Search by name
export const searchCategory = async (req, res) => {
  try {
    const findC  = req.query.name;

    if (!findC) {
      return res.status(400).json({ status: 400, msg: "Name parameter is required for the search." });
    }

    const foundCategories = await prisma.category.findMany({
      take:5,
      where: {
        name: {
          startsWith: findC,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      orderBy:{
        name:"asc"
      }

    });
    return res.json({ status: 200, data: foundCategories });

  } catch (error) {
    console.error("Error searching for categories:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};