import express from "express";
import userModel from '../Models/productModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ

const getAllProduct = async (req, res) => {
  try {
    let userList = await userModel.getAllSanPham(); // Gọi model để lấy danh sách người dùng
    res.render('home', {
      data: {
        title: 'List Product',
        page: 'listProduct',
        rows: userList // Truyền dữ liệu vào view
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Products.");
  }
}
const deltaProduct = async (req, res) => {
  try {
    let deltaProduct = await userModel.getSanPhamById(req.params.id);
    res.render('home', {
      data: {
        title: 'Delta Product',
        page: 'deltaProduct',
        product: deltaProduct
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Product.");
  }
};
// API
// API
// API
const deltaSanpham = async (req, res) => {
  let data = await userModel.getSanPhamById(req.params.id);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    deltaProduct: data
  })
}
const getAllSanPham = async (req, res) => {
  let products = await userModel.getAllSanPham();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    products: products
  })
}
const getSanPhamBynhom = async (req, res) => {
  let data = await userModel.getSanPhamByCategory(req.params.id);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    productbycategory: data
  })
}
export default { getAllSanPham, deltaSanpham, getAllProduct, deltaProduct, getSanPhamBynhom};