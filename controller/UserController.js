import express from "express";
import userModel from '../Models/userModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ
import bcrypt from 'bcryptjs'

// Controller để lấy tất cả người dùng
const getAllUser = async (req, res) => {
  try {
    let userList = await userModel.getAllUser(); // Gọi model để lấy danh sách người dùng
    res.render('home', {
      data: {
        title: 'List User',
        page: 'listUser',
        rows: userList // Truyền dữ liệu vào view
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users.");
  }
}
const viewUser = async (req, res) => {
  try {
    let deltaUser = await userModel.getUserById(req.params.id);
    res.render('home', {
      data: {
        title: 'Delta User',
        page: 'deltaUser',
        user: deltaUser
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user.");
  }
};
const deleteUser = async (req, res) => {
  let { id } = req.body; // Get the id from req.body, not req.params
  await userModel.deleteUserbyID(id);
  res.redirect('/getuser');
};
const editUser = async (req, res) => {
  let id = req.params.id;
  let dataUser = await userModel.getUserById(id);
  res.render('home', { data: { title: 'Edit User', page: 'editUser', row: dataUser} });
};
const updateUser = async (req, res) => {
  const { id, username, password, fullname, address, sex, email } = req.body;
  await userModel.updateUser(id, username, password, fullname, address, sex, email);
  // Điều hướng tới trang chỉnh sửa của người dùng với ID đã được cập nhật
  res.redirect(`/edituser/${id}`);
};
// Controller để tạo người dùng mới
const createUser = (req, res) => {
  res.render('home', {
    data: {
      title: 'Create New User',
      page: 'createNewUser'
    }
  });
}
const insertUser = async (req, res) => {
  let {username, password, fullname, address, sex, email } = req.body;
  if (await userModel.isUserExist(username) || await userModel.isEmailExist(email)) {
    res.send("User or email already exists");
  } else {
    await userModel.insertUser(username, password, address, fullname, sex, email);
    res.redirect("/createNewUser"); 
  }
};

// Xuất các hàm controller để sử dụng trong routing
export { getAllUser, createUser, viewUser, deleteUser, editUser, updateUser, insertUser};
