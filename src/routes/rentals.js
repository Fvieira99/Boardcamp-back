import { Router } from "express";
import { addRental, listRentals } from "../controllers/rentals.js";
import addRentalValidation from "../middlewares/add-rental.js";
import listRentalsValidation from "../middlewares/list-rentals.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentalsValidation, listRentals);
rentalsRouter.post("/rentals", addRentalValidation, addRental);

export default rentalsRouter;
