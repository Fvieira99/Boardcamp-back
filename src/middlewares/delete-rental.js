import connection from "../db.js";

export default async function deleteRentalValidation(req, res, next) {
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
      return res.status(404).send("Id não existe");
    } else if (rental.rows[0].returnDate !== null) {
      return res.sendStatus(400);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
