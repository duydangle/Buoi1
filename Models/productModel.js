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
    tableName: 'nhom',
    timestamps: false
});

// Định nghĩa mô hình `SanPham`
const SanPham = sequelize.define('SanPham', {
    masp: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ten: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gia: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    hinhanh: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mota: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idnhom: {
        type: DataTypes.INTEGER,
        references: {
            model: Nhom,  // Liên kết với bảng `Nhom`
            key: 'idnhom'
        }
    }
}, {
    tableName: 'sanpham',  // Đảm bảo bảng đúng tên
    timestamps: false  // Nếu bảng không có cột createdAt, updatedAt
});

// Định nghĩa mối quan hệ giữa `SanPham` và `Nhom`
SanPham.belongsTo(Nhom, { foreignKey: 'idnhom', as: 'nhom' }); // SanPham có mối quan hệ 1-N với Nhom
Nhom.hasMany(SanPham, { foreignKey: 'idnhom', as: 'sanphams' }); // Nhom có nhiều SanPham

// Lấy tất cả sản phẩm
const getAllSanPham = async () => {
    try {
        const sanphams = await SanPham.findAll({
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']  // Chỉ lấy thuộc tính tên của nhóm
            }
        });
        return sanphams;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw new Error('Could not fetch products.');
    }
};

// Lấy sản phẩm theo ID
const getSanPhamById = async (id) => {
    try {
        const sanpham = await SanPham.findOne({
            where: { masp: id },
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']
            }
        });
        if (!sanpham) {
            throw new Error('Product not found');
        }
        return sanpham;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

// Lấy sản phẩm theo ID nhóm
const getSanPhamByCategory = async (idnhom) => {
    try {
        const sanphams = await SanPham.findAll({
            where: { idnhom },
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']
            }
        });
        return sanphams;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Could not fetch products by category.');
    }
};

// Xóa sản phẩm theo ID
const deleteSanPhamById = async (id) => {
    try {
        const result = await SanPham.destroy({
            where: { masp: id }
        });
        if (result === 0) {
            throw new Error('No product found to delete');
        }
        return result;  // result là số lượng bản ghi bị xóa (nếu thành công)
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw error;
    }
};

// Cập nhật thông tin sản phẩm
const updateSanPham = async (id, ten, gia, hinhanh, mota, idnhom) => {
    try {
        const result = await SanPham.update(
            { ten, gia, hinhanh, mota, idnhom },
            {
                where: {
                    masp: id
                }
            }
        );
        if (result[0] === 0) {
            throw new Error('No product found to update');
        }
        return result;  // result là mảng [số lượng bản ghi được cập nhật, mảng bản ghi]
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Could not update product.');
    }
};

// Thêm sản phẩm mới
const insertSanPham = async (ten, gia, hinhanh, mota, idnhom) => {
    try {
        const newSanPham = await SanPham.create({ ten, gia, hinhanh, mota, idnhom });
        return newSanPham;  // newSanPham là bản ghi mới được tạo
    } catch (error) {
        console.error('Error inserting new product:', error);
        throw new Error('Could not insert product.');
    }
};

// Kiểm tra sản phẩm theo tên
const isSanPhamExist = async (ten) => {
    try {
        const existingSanPham = await SanPham.findOne({
            where: { ten }
        });
        return existingSanPham !== null;
    } catch (error) {
        console.error('Error checking product by name:', error);
        throw new Error('Error checking product existence.');
    }
};

export default {
    getAllSanPham,
    getSanPhamById,
    deleteSanPhamById,
    updateSanPham,
    insertSanPham,
    isSanPhamExist,
    getSanPhamByCategory
};
