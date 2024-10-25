import dotenv from 'dotenv';
import express from 'express';
import { default as date } from './date'; // Ensure the './date' module exists and is correctly implemented

const app = express();
dotenv.config();
const port = process.env.PORT || 3000; // Use default port if environment variable is missing

app.get('/', (req, res) => {
    res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
    res.send(`${date()}<br/>Hello KTPM0121, chúc bạn thành công với Nodejs`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
