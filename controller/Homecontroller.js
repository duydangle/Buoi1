import express from "express"
const getHomePage = (req, res) => {
    return res.render("home", { data: { title: 'Home page', page:"main", content: 'Đây là trang chủ' } })
}
export default getHomePage