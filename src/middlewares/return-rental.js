import connection from "../db.js";

export default async function returnRentalValidation(req, res, next) {
  const rentalIdParam = req.params.id;
  try {
    const rental = await connection.query(
      `
      SELECT * FROM rentals 
      WHERE id = $1
    `,
      [rentalIdParam]
    );

    if (!rental.rows[0]) {
      return res.sendStatus(404);
    } else if (rental.rows[0].returnDate !== null) {
      return res.sendStatus(400);
    }

    const { rentDate, daysRented } = rental.rows[0];
    const rentDateDays = new Date(rentDate).getTime() / (1000 * 60 * 60 * 24);

    const returnDateDays = new Date().getTime() / (1000 * 60 * 60 * 24);

    const diference = parseInt(returnDateDays) - parseInt(rentDateDays);
    console.log(diference);
    console.log(1500 * (diference - daysRented));

    res.locals.delayFeeValue =
      diference <= daysRented ? 0 : 1500 * (diference - daysRented);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
