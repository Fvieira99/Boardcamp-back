import connection from "../db.js";
import addCustomerSchema from "../schemas/add-customer.js";

export default async function addCustomerValidation(req, res, next) {
  const { cpf } = req.body;

  const validation = addCustomerSchema.validate(req.body, { abortEarly: true });

  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map(detail => detail.message));
  }
  try {
    const customer = await connection.query(
      `
      SELECT * FROM customers WHERE cpf = $1
    `,
      [cpf]
    );
    if (customer.rows[0]) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
