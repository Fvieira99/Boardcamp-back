import Joi from "joi";

const addCategorySchema = Joi.object({
  name: Joi.string().min(1).max(50).required()
});

export default addCategorySchema;
