import connection from "../db.js";

export async function listCategories(req, res) {
  try {
    const query = await connection.query("SELECT * FROM categories");
    const categories = query.rows;
    if (categories) {
      return res.status(200).send(categories);
    }
    res.status(200).send("Não há nenhuma categoria no momento");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addCategory(req, res) {
  const { name } = req.body;

  try {
    const query = await connection.query(
      "INSERT INTO categories (name) VALUES ($1)",
      [name]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
