import express from 'express';
import aboutPage from '../controller/AboutController'
import getHomePage from '../controller/HomeController'
import getContact from '../controller/ContactController'
import ApiUserController from '../controller/ApiUserController.js';

const router = express.Router();

const initAPIRoute = (app) => {
    // Định nghĩa các route (đường dẫn) cho API
    router.get('/', getHomePage)
    router.get('/about', aboutPage);  // Gọi controller xử lý route
    router.get('/contact', getContact);
    router.get('/getuser', ApiUserController.getAllUsers);
    router.get('/deltauser/:id', ApiUserController.detailUser);
    router.post('/deleteuser/', ApiUserController.deleteUser)
    router.post('/edituser/', ApiUserController.updateUser)
    router.post('/createnewuser/', ApiUserController.insertUser)
    router.post('/login', ApiUserController.loginUser)
    router.get('/logout', ApiUserController.logoutUser)
    // Gắn router vào ứng dụng Express
    return app.use('/api/v1', router);
};

export default initAPIRoute;