import express from 'express'
import pool from '../configs/connectDatabase'
import bcrypt from 'bcryptjs'
const getAllUser = async () => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users`')
  return rows
}
const getUserById = async (id) => {
  const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]
};
const getUserByUsername = async (username) => {
  const [rows, fields] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0]
};
const deleteUserbyID = async (id) => {
  await pool.execute('DELETE FROM users WHERE id = ?', [id]);
};
const updateUser = async (id, username, password, fullname, address, sex, email) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const sql = 'UPDATE users SET username = ?, password = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?';
  const [result] = await pool.execute(sql, [username, hashedPassword, fullname, address, sex, email, id]);
  return result;
};

const insertUser = async (username, password, fullname, address, sex, email) => {
  // Mã hóa mật khẩu
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // Lưu người dùng vào cơ sở dữ liệu
  await pool.execute(
    'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)', 
    [username, hashedPassword, fullname, address, sex, email]
  );
};

const isUserExist = async (username) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows.length > 0 ? true : false;  
};
const isEmailExist = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length > 0 ? true : false;  
};
export default { getAllUser, getUserById, deleteUserbyID, updateUser, insertUser, isUserExist, isEmailExist, getUserByUsername}