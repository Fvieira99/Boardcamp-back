import connection from "../db.js";

export default async function addRentalValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  if (daysRented <= 0) {
    return res.sendStatus(400);
  }

  try {
    const game = await connection.query(
      `
      SELECT * FROM games WHERE id = $1
    `,
      [gameId]
    );

    if (!game.rows[0]) {
      return res.sendStatus(400);
    }
    console.log(game.rows[0].stockTotal);

    const customer = await connection.query(
      `
      SELECT * FROM customers WHERE id = $1
    
    `,
      [customerId]
    );
    if (!customer.rows[0]) {
      return res.sendStatus(400);
    }

    const notFinishedRentals = await connection.query(
      `
      SELECT * FROM rentals
      WHERE "gameId" = $1 
      AND "returnDate" IS null
    `,
      [gameId]
    );
    console.log(notFinishedRentals.rows);
    if (notFinishedRentals.rows.length === game.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    res.locals.pricePerDay = game.rows[0].pricePerDay;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
