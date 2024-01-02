import { Router } from "express";
import {
  createItem,
  fetchItem,
  fetchItems,
  updateItem,
  deleteItem,
  searchItem,
  searchItemByCategory,
} from "../Controller/itemController.js";

const itemRoutes = Router();
//ITEM
itemRoutes.get("/search",searchItem);  //?name=
itemRoutes.get("/category/search",searchItemByCategory); //?name=

itemRoutes.post("/", createItem);
itemRoutes.get("/", fetchItems);
itemRoutes.get("/:id", fetchItem);
itemRoutes.put("/:id", updateItem);
itemRoutes.delete("/:id", deleteItem);

export default itemRoutes;
