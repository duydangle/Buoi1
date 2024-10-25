import express from "express"
const getContact = (req, res) => {
    return res.render("home", { data: { title: 'Page Contact',
        page:'contact', 
        name: 'Huỳnh Duy Đặng', 
        email: 'hddang2100514@gmail.com',
        phonenumber: '1234567890' } })
}
export default getContact