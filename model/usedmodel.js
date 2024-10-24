import express from 'express'
import pool from '../config/condb'
const getAllUser = async () => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users`')
  return rows
}
const getUserById = async (id) => {
  const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]
};
const deleteUserbyID = async (id) => {
  await pool.execute('DELETE FROM users WHERE id = ?', [id]);
};
const updateUser = async (id, username, password, fullname, address, sex, email) => {
  const sql = 'UPDATE users SET username = ?, password = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?';
  const [result] = await pool.execute(sql, [username, password, fullname, address, sex, email, id]);
  return result;
};

const insertUser = async (username, password, fullname, address, sex, email) => {
  await pool.execute(
    'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)', 
    [username, password, fullname, address, sex, email]
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
// Kiểm tra thông tin đăng nhập
const loginUser = async (username) => {
  // Truy vấn thông tin người dùng theo tên đăng nhập
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  
  // Nếu tìm thấy người dùng thì trả về thông tin người dùng, ngược lại trả về null
  if (rows.length > 0) {
    return rows[0]; // Trả về đối tượng người dùng đầu tiên (chỉ có một kết quả do username là duy nhất)
  } else {
    return null;
  }
};

export default { getAllUser, getUserById, deleteUserbyID, updateUser, insertUser, isUserExist, isEmailExist, loginUser };

