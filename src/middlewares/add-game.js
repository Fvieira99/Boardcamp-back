import addGameSchema from "../schemas/add-game.js";

export default function addGameValidation(req, res, next) {
  const validation = addGameSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map(detail => detail.message));
  }

  next();
}
