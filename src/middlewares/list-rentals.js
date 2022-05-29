import connection from "../db.js";

export default async function listRentalsValidation(req, res, next) {
  const qsCustomerId = req.query.customerId;
  const qsGameId = req.query.gameId;
  let rentals;
  try {
    if (qsCustomerId) {
      rentals = await connection.query(
        `
        SELECT * FROM rentals 
        WHERE "customerId" = $1
      
      `,
        [qsCustomerId]
      );
    } else if (qsGameId) {
      rentals = await connection.query(
        `
      SELECT * FROM rentals
      WHERE "gameId" = $1 

    `,
        [qsGameId]
      );
    } else {
      rentals = await connection.query(`
      SELECT * FROM rentals 

    `);
    }
    res.locals.rentals = rentals;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
