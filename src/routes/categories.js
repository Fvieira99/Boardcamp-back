import { Router } from "express";
import { addCategory, listCategories } from "../controllers/categories.js";
import addCategoryValidation from "../middlewares/add-category.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", listCategories);
categoriesRouter.post("/categories", addCategoryValidation, addCategory);
export default categoriesRouter;
