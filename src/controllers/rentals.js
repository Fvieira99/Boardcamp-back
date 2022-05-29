import connection from "../db.js";
import dayjs from "dayjs";

// --------------------  FIX ME! ---------------------
export async function listRentals(req, res) {
  const rentalsArr = [];
  const rentals = res.locals.rentals;
  try {
    for (let rental of rentals.rows) {
      const customer = await connection.query(
        `
        SELECT id, name FROM customers 
        WHERE id = ${rental.customerId}
      `
      );

      const game = await connection.query(`
        SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" 
        FROM games
        JOIN categories ON categories.id = games."categoryId"
      `);

      rentalsArr.push({
        ...rental,
        customer: customer.rows[0],
        game: game.rows[0]
      });
    }
    res.send(rentalsArr);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const date = dayjs().format("YYYY-MM-DD");

  const pricePerDay = res.locals.pricePerDay;
  try {
    const newRental = await connection.query(
      `

      INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    
    `,
      [
        customerId,
        gameId,
        date,
        daysRented,
        null,
        daysRented * pricePerDay,
        null
      ]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
