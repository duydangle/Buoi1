
const url = require('url'); 

const getPath = (req) => {
    return req.url; 
};

const getParamsURL = (req) => {
    let urlData = url.parse(req.url, true); 
    return JSON.stringify(urlData.query); 
};

module.exports = { getPath, getParamsURL }; 



//es6
// import { parse } from 'url';
// const getPath = (req) => {
//     return req.url;
// }
// const getParamesURL = (req) => {
//     let urlData = parse(req.url, true);
//     return JSON.stringify(urlData.query);
// }
// export default { getPath, getParamesURL };