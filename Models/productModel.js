import express from 'express'
import pool from '../configs/connectDatabase'

// Lấy tất cả sản phẩm
const getAllSanPham = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sanpham`');
    return rows;
};

// Lấy sản phẩm theo ID
const getSanPhamById = async (id) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sanpham` WHERE masp = ?', [id]);
    return rows[0];
};

const getSanPhamByCategory = async (idnhom) => {
    const [rows, fields] = await pool.execute(
        'SELECT nhom.ten AS ten_nhom, sanpham.* FROM `sanpham` JOIN `nhom` ON sanpham.idnhom = nhom.idnhom WHERE sanpham.idnhom = ?',
        [idnhom]
    );
    return rows;
};



// Xóa sản phẩm theo ID
const deleteSanPhamById = async (id) => {
    await pool.execute('DELETE FROM `sanpham` WHERE masp = ?', [id]);
};

// Cập nhật thông tin sản phẩm
const updateSanPham = async (id, ten, gia, hinhanh, mota, idnhom) => {
    const sql = `
        UPDATE sanpham 
        SET ten = ?, gia = ?, hinhanh = ?, mota = ?, idnhom = ? 
        WHERE masp = ?
    `;
    const [result] = await pool.execute(sql, [ten, gia, hinhanh, mota, idnhom, id]);
    return result;
};

// Thêm sản phẩm mới
const insertSanPham = async (ten, gia, hinhanh, mota, idnhom) => {
    await pool.execute(
      'INSERT INTO sanpham (ten, gia, hinhanh, mota, idnhom) VALUES (?, ?, ?, ?, ?)', 
      [ten, gia, hinhanh, mota, idnhom]
    );
};

// Kiểm tra sản phẩm theo tên
const isSanPhamExist = async (ten) => {
    const [rows] = await pool.execute('SELECT * FROM `sanpham` WHERE ten = ?', [ten]);
    return rows.length > 0;
};

export default { getAllSanPham, getSanPhamById, deleteSanPhamById, updateSanPham, insertSanPham, isSanPhamExist, getSanPhamByCategory };