import express from 'express';
import aboutPage from '../controller/AboutController'
import getHomePage from '../controller/HomeController'
import getContact from '../controller/ContactController'
import ApiUserController from '../controller/ApiUserController.js';
import CategoryController from '../controller/CategoryController.js';
import ProductController from '../controller/ProductController.js';
import { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware, userMiddleware, handleGetAccount, handleLogin, handleLogout, cl_userMiddleware, cl_authMiddleware } from '../controller/authMiddlewareController';
const router = express.Router();

const initAPIRoute = (app) => {
    // Định nghĩa các route (đường dẫn) cho API
    router.get('/', getHomePage)
    router.get('/about', aboutPage);  // Gọi controller xử lý route
    router.get('/contact', getContact);
    router.get('/getuser', authMiddleware, ApiUserController.getAllUsers);
    router.get('/deltauser/:id', authMiddleware, userMiddleware, ApiUserController.detailUser);
    router.post('/deleteuser/', authMiddleware, userMiddleware, ApiUserController.deleteUser)
    router.post('/edituser/', authMiddleware, userMiddleware, ApiUserController.updateUser)
    router.post('/createnewuser/', authMiddleware, adminMiddleware, ApiUserController.insertUser)



    router.post('/login', handleLogin)
    router.get('/logout', handleLogout)
    router.get('/account', handleGetAccount)
    router.get('/deltauserbyusername/:username', cl_authMiddleware, cl_userMiddleware, ApiUserController.detailUserbyUsername)
    

    router.get('/category', CategoryController.getAllNhom)
    router.get('/productbycategory/:id', CategoryController.getAllNhom)

    router.get('/product', ProductController.getAllSanPham)
    router.get('/deltaproduct/:id', ProductController.deltaSanpham);

    router.get('/getproductbycategory/:id', ProductController.getSanPhamBynhom);
    
    // Gắn router vào ứng dụng Express
    return app.use('/api/v1', router);
};

export default initAPIRoute;