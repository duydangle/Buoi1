import express from 'express'
import dotenv from 'dotenv/config'
import { default as date } from './date';
import getURL from './getURL';
import viewEngine from './viewEngine';  
const app= express()
const post=process.env.post
app.get('/', (req,res)=>{
    res.send('Hello World')
})
app.listen(post,()=>{
    console.log('Example app listening on port ${port}')
})
app.get('/about',(req,res)=>{
    res.send('Hello World!. Paga About')
})

app.get('/date', (req, res) => {
    res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
    res.send(`${date()}`);
});
app.get('/geturl', (req, res) => {
    res.status(200).set({'Content-Type': 'text/html; charset=utf-8'});
    res.write(`${getURL.getPath(req)}<br/>`);
    res.write(`${getURL.getParamsURL(req)}<br/>`);
});
viewEngine(app);
app.get('/ejs', (req, res) => {
    res.render('test');  
});
app.get('/', (req, res) => {
    res.render('home');  
});
app.get('/about', (req, res) => {
    res.render('about');  
});
