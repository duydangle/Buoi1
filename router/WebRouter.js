import express from 'express'
import { default as date } from '../date';
import getURL_ES6 from '../getURL_ES6';
import aboutPage from '../controller/AboutController'
import getHomePage from '../controller/HomeController'
import getContact from '../controller/ContactController'
import { getAllUser } from '../controller/UserController';
import { viewUser } from '../controller/UserController';
import { deleteUser } from '../controller/UserController';
import { editUser } from '../controller/UserController';
import { updateUser } from '../controller/UserController';
import { createUser } from '../controller/UserController';
import { insertUser } from '../controller/UserController';
import ProductController from '../controller/ProductController';
import CategoryController from '../controller/CategoryController';
import { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware, userMiddleware } from '../controller/authMiddlewareController';
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
    router.get('/about', aboutPage) // Gọi controller xử lý route
    router.get('/contact', getContact)
    router.get('/login', getLoginPage)
    router.post('/login', loginUser)
    router.get('/logout', getLogoutPage)
    router.get('/product', ProductController.getAllProduct)
    router.get('/deltaproduct/:id', ProductController.deltaProduct)
    router.get('/category', CategoryController.getAllCategory)


    router.get('/getuser', authMiddleware, getAllUser)
    router.get('/deltauser/:id', authMiddleware, userMiddleware, viewUser)
    router.post('/deleteuser/', authMiddleware, userMiddleware, deleteUser)
    router.get('/edituser/:id', authMiddleware, userMiddleware, editUser)
    router.post('/edituser/', authMiddleware, userMiddleware, updateUser)
    router.get('/createnewuser/', authMiddleware, adminMiddleware, createUser)
    router.post('/createnewuser/', authMiddleware, adminMiddleware, insertUser)

    // // Route để thiết lập session
    // router.get('/set-session', (req, res) => {
    //     req.session.user = {
    //         username: 'nthyen',
    //         fullname: 'Nguyễn Thị Hồng Yến'
    //     }
    //     res.send("Set ok!");
    // });

    // Route để lấy thông tin từ session
    router.get('/get-session', (req, res) => {
        res.send(req.session);
    });
    router.get('/date', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.send(`${date()}`);
    });
    router.get('/geturl', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`${getURL_ES6.getPath(req)}<br/>`);
        res.write(`${getURL_ES6.getParamesURL(req)}<br/>`);
    });
    app.use(sessionMiddleware);
    return app.use('/', router)
}
export default initWebRoute


