import addCategorySchema from "../schemas/add-category.js";

export default function addCategoryValidation(req, res, next) {
  const validation = addCategorySchema.validate(req.body, {
    abortEarly: false
  });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map(detail => detail.message));
  }

  next();
}
