import {Router} from "express";
import { getTransaction } from "../Controller/transactionController.js";
import { createStockIn, fetchStockIn, fetchStockIns } from "../Controller/stockInController.js";
import {createStockOut, fetchStockOut,fetchStockOuts} from "../Controller/stockOutController.js";

const transcationRoutes = Router();

transcationRoutes.get("/",getTransaction);

transcationRoutes.get("/stockIn",fetchStockIns);
transcationRoutes.get("/stockIn/:id",fetchStockIn);
transcationRoutes.post("/stockIn",createStockIn);

transcationRoutes.get("/stockOut",fetchStockOuts);
transcationRoutes.get("/stockOut/:id",fetchStockOut);
transcationRoutes.post("/stockOut",createStockOut);

export default transcationRoutes;
