//guadamos en una variable express
const express = require('express')
//creamos otra variable donde guardamos el metodo router
const  router = express.Router()
//guardamos en otra el llamado a la base de datos y su conexion
const pool = require('../database')
//creamos una ruta luego vamos a nuestro archivo principal index.js 
//a las rutas y l llamamos de esta manera app.use(require('./rutas'))
//peticion request y require
router.get('/add',(req,res)=>{
	// res.send('formulario')
	res.render('links/add')
})

router.post('/add',async (req,res)=>{
	
	const {url, title, descripcion} = req.body
	const newLInk ={
		url,
		title,
		descripcion
	}
	//guardamos en la base de datos
	await pool.query('INSERT INTO link set ?',[newLInk]);
	req.flash('correcto', 'Link guardado corretamente!')
	res.redirect('/links')
})

router.get('/', async (req,res)=>{
	const links = await pool.query('SELECT * FROM link')
	res.render('links/list', {links})
})
 router.get('/delete/:id',async (req, res)=>{
 	// console.log(req.params.id)
 	const {id} = req.params
 	await pool.query('DELETE FROM link WHERE id = ?', [id])
	req.flash('correcto','link borrado!')
	res.redirect('/links')

 })

 router.get('/editar/:id', async(req, res)=>{
 	const {id} = req.params
 	const links =await pool.query('SELECT * FROM link WHERE id = ?', [id])
 	res.render('links/editar',{link: links[0]})
 	
 })

router.post('/editar/:id',async (req,res)=>{
	const {id} = req.params
	const {url, title, descripcion} = req.body
	const newLInk ={
		url,
		title,
		descripcion
	}
	//guardamos en la base de datos
	await pool.query('UPDATE link set ? WHERE id =?',[newLInk, id]);
	res.redirect('/links')

})

//exportamos 
module.exports = router;