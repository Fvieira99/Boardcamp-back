import connection from "../db.js";
import dayjs from "dayjs";

// --------------------  FIX ME! ---------------------
// export async function listRentals(req, res) {
//   try {
//     const rentals = await connection.query(`
//       SELECT rentals.*, (customers.id, customers.name) AS customer,
//       (SELECT games.*, categories.name AS "categoryName" FROM games
//       JOIN categories ON games."categoryId" = categories.id) AS game
//       FROM rentals

//     `);
//   } catch (error) {}
// }

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
