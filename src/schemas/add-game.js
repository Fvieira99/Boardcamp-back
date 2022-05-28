import Joi from "joi";

const addGameSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  image: Joi.string().min(1).required(),
  stockTotal: Joi.number().min(1).required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.number().min(1).required()
});

export default addGameSchema;
