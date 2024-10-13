import express from "express"
const getAboutPage = (req, res) => {
    return res.render("home", { data: { title: 'About page', page:"about", content: 'Đây là trang about' } })
}
export default getAboutPage