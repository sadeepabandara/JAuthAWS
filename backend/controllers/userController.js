const db = require('../db');

exports.addUser = (req, res) => {
  const { name, email, password, phone, address, birthdate } = req.body;

  // Backend form data validation
  if (!name || !email || !password || !phone || !address || !birthdate) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const sql =
    'INSERT INTO USER (USER_NAME, USER_EMAIL, USER_PASSWORD, USER_PHONE, USER_ADDRESS, USER_DOB) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [name, email, password, phone, address, birthdate],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: 'Database error', details: error });
      }
      res.json({
        message: 'User has been added successfully!',
        userId: result.insertId,
      });
    }
  );
};
