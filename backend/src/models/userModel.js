import pool from '../config/db.js';

const createUser = async (userData) => {
  const { email, password, rol, lenguage } = userData;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, password, rol, lenguage]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving users:', error);
    return [];
  }
};

export { createUser, findUserByEmail, getAllUsers };