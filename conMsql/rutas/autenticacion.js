//guadamos en una variable express
const express = require('express')
//creamos otra variable donde guardamos el metodo 
//router
const  router = express.Router()
//creamos una ruta luego vamos a nuestro archivo principal index.js 
//a las rutas y l llamamos de esta manera app.use(require('./rutas'))
router.get('/',(req,res)=>{
	res.send('Hello Work autenticación!')
})
//exportamos 
module.exports = router;