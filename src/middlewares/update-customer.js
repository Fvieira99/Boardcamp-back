import connection from "../db.js";
import addCustomerSchema from "../schemas/add-customer.js";

export default async function updateCustomerValidation(req, res, next) {
  const { id } = req.params;
  const { cpf, birthday } = req.body;

  console.log(birthday);
  const validation = addCustomerSchema.validate(
    { ...req.body, birthday: birthday.slice(0, 10) },
    { abortEarly: true }
  );

  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map(detail => detail.message));
  }
  try {
    const customer = await connection.query(
      `
      SELECT * FROM customers 
      WHERE cpf = $1
      AND id != $2
    `,
      [cpf, id]
    );
    if (customer.rows.length > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
