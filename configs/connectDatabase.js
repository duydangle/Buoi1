import mysql from 'mysql2'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ltwnc_buoi3_node',
    password: ''
})
const connection = pool.promise();
export default connection