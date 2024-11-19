import express from 'express'
import bcrypt from 'bcryptjs';
import { sequelize, DataTypes } from '../configs/connectDatabase'; // Nhập sequelize và DataTypes từ connectDatabase

// Định nghĩa mô hình User với Sequelize
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,  // Sử dụng DataTypes
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,  // Bạn có thể thay đổi điều kiện này nếu muốn
    defaultValue: 'user'  // Gán giá trị mặc định là 'user'
  }
}, {
  timestamps: false, // Không sử dụng createdAt, updatedAt
});


// Đồng bộ mô hình với cơ sở dữ liệu (Chỉ cần chạy một lần khi ứng dụng bắt đầu)
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.log('Error syncing database: ', err));

// Các hàm CRUD sử dụng Sequelize

const getAllUser = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({
    where: { username }
  });
  return user;
};

const deleteUserByID = async (id) => {
  const result = await User.destroy({
    where: { id }
  });
  return result;
};

const updateUser = async (id, username, password, fullname, address, sex, email) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const result = await User.update(
    { username, password: hashedPassword, fullname, address, sex, email },
    { where: { id } }
  );
  return result;
};

const insertUser = async (username, password, fullname, address, sex, email) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    fullname,
    address,
    sex,
    email
  });

  return user;
};

const isUserExist = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user ? true : false;
};

const isEmailExist = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user ? true : false;
};

export default { getAllUser, getUserById, deleteUserByID, updateUser, insertUser, isUserExist, isEmailExist, getUserByUsername };
