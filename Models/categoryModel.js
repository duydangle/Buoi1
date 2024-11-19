import express from 'express'
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDatabase'; // Đảm bảo rằng bạn đã xuất đúng đối tượng sequelize từ file kết nối.

// Định nghĩa mô hình `Nhom`
const Nhom = sequelize.define('Nhom', {
    idnhom: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ten: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'nhom', // Đảm bảo bảng đúng tên
    timestamps: false  // Nếu bảng không có cột createdAt, updatedAt
});

// Lấy tất cả các nhóm
const getAllNhom = async () => {
    try {
        const nhoms = await Nhom.findAll();
        return nhoms;
    } catch (error) {
        console.error('Error fetching all groups:', error);
        throw error;
    }
};

// Xóa nhóm theo ID
const deleteNhomById = async (id) => {
    try {
        const result = await Nhom.destroy({
            where: {
                idnhom: id
            }
        });
        return result;  // result sẽ là số lượng bản ghi bị xóa (nếu thành công)
    } catch (error) {
        console.error('Error deleting group by ID:', error);
        throw error;
    }
};

// Cập nhật tên nhóm
const updateNhom = async (id, ten) => {
    try {
        const result = await Nhom.update(
            { ten },
            {
                where: {
                    idnhom: id
                }
            }
        );
        return result;  // result là mảng [số lượng bản ghi được cập nhật, mảng bản ghi]
    } catch (error) {
        console.error('Error updating group name:', error);
        throw error;
    }
};

// Thêm nhóm mới
const insertNhom = async (ten) => {
    try {
        const result = await Nhom.create({ ten });
        return result;  // result là bản ghi mới được tạo
    } catch (error) {
        console.error('Error inserting new group:', error);
        throw error;
    }
};

export default { getAllNhom, deleteNhomById, updateNhom, insertNhom };
