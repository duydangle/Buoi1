import express from 'express'
import { default as date } from '../date'; 
import getURL from '../getURL';
import getHomePage from '../controller/Homecontroller'
import getAboutPage from '../controller/Aboutcontroller';
import getContactPage from '../controller/ContactController';
import { getAllUser } from '../controller/UserController';
import { viewUser } from '../controller/UserController';
import { deleteUser } from '../controller/UserController';
import { editUser } from '../controller/UserController'; 
import { updateUser } from '../controller/UserController'; 
import { createUser } from '../controller/UserController'; 
import { insertUser } from '../controller/UserController'; 
import {loginUser} from '../controller/UserController';
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
    router.get('/about',getAboutPage)
    router.get('/contact',getContactPage)
    router.get('/Alluser',getAllUser)
    router.get('/deltauser/:id', viewUser); 
    router.post('/deleteuser/', deleteUser) 
    router.get('/edituser/:id', editUser); 
    router.post('/edituser/', updateUser) 
    router.get('/createnewuser/', createUser);
    router.post('/login/', loginUser);
    router.get('/date', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.send(`${date()}`);
    });
    router.get('/geturl', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`${getURL_ES6.getPath(req)}<br/>`);
        res.write(`${getURL_ES6.getParamesURL(req)}<br/>`);
    });

    return app.use('/', router)
}
export default initWebRoute


