import Joi from "joi";

const addCustomerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  cpf: Joi.string()
    .min(1)
    .max(11)
    .pattern(/^[0-9]{11}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^([0-9]{10})([0-9]{1})?$/)
    .required(),
  birthday: Joi.string()
    .pattern(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(1[0-9]|2[0-9]|3[0-1])$/)
    .required()
});

export default addCustomerSchema;
