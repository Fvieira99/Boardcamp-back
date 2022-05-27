import connection from "../db.js";

export async function listGames(req, res) {
  const name = req.query.name;
  try {
    if (name) {
      console.log(name);
      const query = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games
        JOIN categories ON games."categoryId" = categories.id
        WHERE games.name LIKE $1 || '%' `,
        [name]
      );
      const games = query.rows;
      return res.status(200).send(games);
    }
    const query = await connection.query(`
      SELECT games.*, categories.name AS "categoryName" FROM games
      JOIN categories ON games."categoryId" = categories.id
    `);
    const games = query.rows;
    console.log(games);
    res.status(200).send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    const query = await connection.query(
      `
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES ($1, $2, $3, $4, $5)
    `,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
