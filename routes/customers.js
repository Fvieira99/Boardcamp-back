import { Router } from "express";
import {
  addCustomer,
  getSingleCustomer,
  listCustomers
} from "../controllers/customers.js";
import addCustomerValidation from "../middlewares/add-customer.js";

const customersRouter = Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:customerId", getSingleCustomer);
customersRouter.post("/customers", addCustomerValidation, addCustomer);

export default customersRouter;
