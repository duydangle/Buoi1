import express from "express"
import userModel from '../Models/userModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ
import bcrypt from 'bcryptjs'
const sessionMiddleware = (req, res, next) => {
    // Gán thông tin session vào res.locals
    res.locals.session = req.session; 
    next();
};
const getLoginPage = (req, res) => {
    return res.render("home", { data: { title: 'Login page', page:"login", content: 'Đây là Đăng nhập' } })
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.render('home', { 
                title: 'Login', 
                data: { page: 'login', error: 'Tên người dùng hoặc mật khẩu không đúng.' } 
            });
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('home', { 
                title: 'Login', 
                data: { page: 'login', error: 'Tên người dùng hoặc mật khẩu không đúng.' } 
            });
        }

        // Chỉ lưu username và fullname vào session
        req.session.user = {
            username: user.username,   // Giả sử username có trong user
            fullname: user.fullname,     // Giả sử fullname có trong user
            role: user.role
        };

        res.redirect('/'); // Chuyển hướng về trang chính
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
};
const getLogoutPage = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.redirect('/'); // Quay về trang chính nếu có lỗi
        }
        res.clearCookie('connect.sid'); // Xóa cookie phiên
        res.redirect('/'); 
    });
};


const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
    next();
};

const adminMiddleware = (req, res, next) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied'); // Trả về lỗi 403 nếu không phải là admin
    }
    next();
};

const userMiddleware = async (req, res, next) => {
    const id = req.params.id || req.body.id;
    const sessionUser = req.session.user; // Lấy thông tin user từ session

    try {
        // Lấy thông tin username từ CSDL theo id
        const user = await userModel.getUserById(id); 

        if (!user) {
            return res.status(404).send('User not found.'); // Trả về lỗi nếu không tìm thấy user
        }

        // Nếu là admin, cho phép thực hiện mọi thao tác
        if (sessionUser.role === 'admin') {
            return next();
        }

        // Nếu là user, chỉ cho phép thao tác trên tài khoản của chính mình
        if (sessionUser.role === 'user' && sessionUser.username !== user.username) {
            return res.status(403).send('Access denied. Bạn chỉ có thể thao tác trên tài khoản của mình.');
        }

        next(); // Tiếp tục nếu quyền hợp lệ
    } catch (error) {
        console.error('Error in access control:', error);
        res.status(500).send('Internal Server Error');
    }
};

export { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware, userMiddleware };
