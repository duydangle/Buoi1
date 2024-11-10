import express from "express";
import userModel from '../Models/categoryModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ

const getAllCategory = async (req, res) => {
    try {
        let categoryList = await userModel.getAllNhom(); // Gọi model để lấy danh sách người dùng
        res.render('home', {
          data: {
            title: 'List Category',
            page: 'Category',
            rows: categoryList // Truyền dữ liệu vào view
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving Categorys.");
      }
}
// API
// API
const getAllNhom = async (req, res) => {
    let categorys = await userModel.getAllNhom();
    return res.status(200).json({
        errCode: 1,
        message: "Success",
        categorys: categorys
    })
}
export default{ getAllNhom, getAllCategory};