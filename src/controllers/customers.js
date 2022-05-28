import connection from "../db.js";

export async function listCustomers(req, res) {
  const cpf = req.query.cpf;

  try {
    if (cpf) {
      const query = await connection.query(
        `
        SELECT * FROM customers
        WHERE id LIKE $1 || '%'
      `,
        [cpf]
      );
      const customer = query.rows[0];
      return res.status(200).send(customer);
    }

    const query = await connection.query(`
      SELECT * FROM customers 
    `);
    const customers = query.rows;
    return res.status(200).send(customers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getSingleCustomer(req, res) {
  const { customerId } = req.params;

  try {
    const query = await connection.query(
      `
      SELECT * FROM customers
      WHERE id = $1
    `,
      [customerId]
    );
    const customer = query.rows[0];

    if (!customer) {
      return res.sendStatus(404);
    }

    res.status(200).send(customer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addCustomer(req, res) {
  const { name, cpf, birthday, phone } = req.body;

  try {
    const newCustomer = await connection.query(
      `
      INSERT INTO customers (name, cpf, birthday, phone)
      VALUES ($1, $2, $3, $4)
    
    `,
      [name, cpf, birthday, phone]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
