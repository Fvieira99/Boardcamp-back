import { Router } from "express";
import { addRental } from "../controllers/rentals.js";
import addRentalValidation from "../middlewares/add-rental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals");
rentalsRouter.post("/rentals", addRentalValidation, addRental);

export default rentalsRouter;
