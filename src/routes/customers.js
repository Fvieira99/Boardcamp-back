import { Router } from "express";
import {
  addCustomer,
  getSingleCustomer,
  listCustomers,
  updateCustomer
} from "../controllers/customers.js";
import addCustomerValidation from "../middlewares/add-customer.js";
import updateCustomerValidation from "../middlewares/update-customer.js";

const customersRouter = Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:customerId", getSingleCustomer);
customersRouter.post("/customers", addCustomerValidation, addCustomer);
customersRouter.put("/customers/:id", updateCustomerValidation, updateCustomer);

export default customersRouter;
