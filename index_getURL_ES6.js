import dotenv from 'dotenv';
import express from 'express';
import { default as date } from './date';
import getURL_ES6 from './getURL_ES6'; 

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).set({'Content-Type': 'text/html; charset=utf-8'});
    res.write(`${date()}<br/>`);
    res.write(`${getURL_ES6.getPath(req)}<br/>`);
    res.write(`${getURL_ES6.getParamesURL(req)}<br/>`);
    res.write(`Hello KTPM0121, chúc bạn thành công với Nodejs`);
    res.end();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
