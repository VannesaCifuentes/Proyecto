const mysql = require('mysql');
const { promisify } = require('util')
const { database } = require('../config/keys')

const pool = mysql.createPool(database)


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('la coneccion a base de datos fue cerrada')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conecciones')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La coneccion fue rechazada')
        }
        if (err.message == 'Query was empty') {
            console.log('There is no changes in the update, lets continue the progress...');
            next();
        }
    }
    if (connection) connection.release()
    console.log('DB is connected')
    return
})

pool.query = promisify(pool.query)

module.exports = pool;