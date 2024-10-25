import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './configs/viewEngine';  
import initWebRoute from './router/WebRouter';
import initAPIRoute from './router/apiRouter';
import path from 'path'
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

const app = express()
const port=process.env.PORT
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
viewEngine(app);
app.use('/static', express.static(path.join(__dirname, 'public')))


// Khởi tạo Redis client
let redisClient = createClient();
redisClient.connect().catch(console.error); // Bắt lỗi nếu kết nối thất bại
// Khởi tạo Redis Store
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
// Thiết lập session middleware với Redis Store
app.use(
  session({
    store: redisStore,
    resave: false, // Không lưu session nếu không có thay đổi
    saveUninitialized: false, // Chỉ lưu session nếu có dữ liệu
    secret: "keyboard cat", // Khóa bí mật để mã hóa session
  })
);
initWebRoute(app)
initAPIRoute(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



