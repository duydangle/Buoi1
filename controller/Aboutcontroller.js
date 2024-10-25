import express from "express"
const aboutPage = (req, res) => {
    return res.render("home", { data: { title: 'About page ABC', page: 'about', content:'Đây là trang About' } })
}
export default aboutPage