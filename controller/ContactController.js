import express from "express"
const getContactPage = (req, res) => {
    return res.render("home", { data: { title: 'Contact page', page:"contact", content: 'Đây là trang contact' } })
}
export default getContactPage