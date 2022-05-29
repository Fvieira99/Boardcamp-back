import { Router } from "express";

import {
  addRental,
  returnRental,
  listRentals,
  deleteRental
} from "../controllers/rentals.js";
import addRentalValidation from "../middlewares/add-rental.js";
import deleteRentalValidation from "../middlewares/delete-rental.js";
import listRentalsValidation from "../middlewares/list-rentals.js";
import returnRentalValidation from "../middlewares/return-rental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentalsValidation, listRentals);
rentalsRouter.post("/rentals", addRentalValidation, addRental);
rentalsRouter.post("/rentals/:id/return", returnRentalValidation, returnRental);
rentalsRouter.delete("/rentals/:id", deleteRentalValidation, deleteRental);

export default rentalsRouter;
