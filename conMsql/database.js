const mysql = require('mysql')
//para los callbacks no soportados mysql
const {promisify} = require('util')
const {database} =require('./keys')/*destructuring*/
//conectamos a la bsa de datos 
const pool =mysql.createPool(database)
pool.getConnection((err,connection)=>{
	if(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.error('La base de datos ha sido cerrada')
		}
		if(err === 'ER_CON_COUNT_ERROR'){
			consol.error('La base de datos tiene muchas conexiones')
		}
		if(err.code === 'ECONNREFUSED'){
			console.error('La base de datos ha sido rechazada')
		}
	}
	if(connection) connection.release()
		console.log('base de datos conectada!')
	return;
})
// promisify pool query
pool.query = promisify(pool.query)
module.exports = pool;



