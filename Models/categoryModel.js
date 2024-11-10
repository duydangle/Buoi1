import express from 'express'
import pool from '../configs/connectDatabase'
// Lấy tất cả các nhóm
const getAllNhom = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `nhom`');
    return rows;
};

// Xóa nhóm theo ID
const deleteNhomById = async (id) => {
    await pool.execute('DELETE FROM `nhom` WHERE idnhom = ?', [id]);
};

// Cập nhật tên nhóm
const updateNhom = async (id, ten) => {
    const sql = 'UPDATE `nhom` SET ten = ? WHERE idnhom = ?';
    const [result] = await pool.execute(sql, [ten, id]);
    return result;
};

// Thêm nhóm mới
const insertNhom = async (ten) => {
    await pool.execute(
      'INSERT INTO `nhom` (ten) VALUES (?)', 
      [ten]
    );
};

export default { getAllNhom, deleteNhomById, updateNhom, insertNhom};