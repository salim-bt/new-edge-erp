import e from "cors";
import prisma from "../DB/db.config.js";
//CREATE
export const createItem = async (req, res) => {
  const { category_id, name, unit, description, brand,unit_price } = req.body;

  //* increment item counter in category
  await prisma.category.update({
    where: {
      id: Number(category_id),
    },
    data: {
      item_count: {
        increment: 1,
      },
    },
  });

  const newItem = await prisma.item.create({
    data: {
      category_id: category_id,
      name: name,
      unit: unit,
      brand: brand,
      unit_price:Number(unit_price),
      description: description,
    },
  });
  return res.json({ status: 200, data: newItem, msg: "Item Created!" });
};

//READ
export const fetchItems = async (req, res) => {
  const itmes = await prisma.item.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: true,
      item_instance:true,
    },
  });
  return res.json({ status: 200, data: itmes });
};

export const fetchItem = async (req, res) => {
  const ItemId = req.params.id;
  const Item = await prisma.item.findFirst({
    where: {
      id: Number(ItemId),
    },
    include: {
      category: true,
      item_instance:true,
    },
  });
  return res.json({ status: 200, data: Item });
};

//UPDATE
export const updateItem = async (req, res) => {
  const ItemId = req.params.id;
  const { name, unit,brand,unit_price, description,category_id } = req.body;

  const Item = await prisma.item.update({
    where: {
      id: Number(ItemId),
    },
    data: {
        category_id:category_id,
        name: name,
        unit: unit,
        brand: brand,
        unit_price:Number(unit_price),
        description: description,
    },
  });
  res.json({ status: 200, data: Item, message: "Item update sucessfull!" });
};

//DELETE
export const deleteItem = async (req, res) => {
  const ItemId = req.params.id;

  const category_id = await prisma.item.findFirst({
    where: {
      id: Number(ItemId),
    },
  });
  //* decrement item count in category
  await prisma.category.update({
    where: {
      id: Number(category_id.category_id),
    },
    data: {
      item_count: {
        decrement: 1,
      },
    },
  });

  await prisma.item.delete({
    where: {
      id: Number(ItemId),
    },
  });

  return res.json({ status: 200, message: "Item deleted successfully" });
};






//Search by name
export const searchItem = async (req, res) => {
  try {
    const findC  = req.query.name;

    if (!findC) {
      return res.status(400).json({ status: 400, msg: "Name parameter is required for the search." });
    }

    const foundItems = await prisma.item.findMany({
      take:5,
      where: {
        name: {
          startsWith: findC,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      include:{
        category:true
      },
      orderBy:{
        name:"asc"
      }

    });
    return res.json({ status: 200, data: foundItems });

  } catch (error) {
    console.error("Error searching for items:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

// Search by category name
export const searchItemByCategory = async (req, res) => {
  try {
    const categoryName = req.query.name;
    console.log(categoryName);

    if (!categoryName) {
      return res.status(400).json({ status: 400, msg: "Name parameter is required for the search." });
    }

    const foundItems = await prisma.item.findMany({
      where: {
        category: {
          name: {
            startsWith: categoryName,
            mode: 'insensitive', // Case-insensitive search
          },
        },
      },
      include: {
        category: true,
      },
      // orderBy: {
      //   name: "asc",
      // },
    });

    return res.json({ status: 200, data: foundItems });

  } catch (error) {
    console.error("Error searching for items by category:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};
