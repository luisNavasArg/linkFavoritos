const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const {database} = require('./keys')
//inicializamos
const app = express();

//configuracion

app.set('port',process.env.PORT || 3000)
//setiamos la ruta de la carpeta vistas
//usando metodo join y la propiedad
// __dirname para copiar ruta donde se esta ejecutando
app.set('views',path.join(__dirname,'views'))
//configuracion del motor
	//creamos un directorio dentro de vistas con el
	//nombre layouts y un archivo dentro de ella
	//main.hbs
app.engine('.hbs',exphbs({
	defaultLayout:'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname:'.hbs',
	helpers:require('./lib/handlebars')
}))
app.set('view engine','.hbs') 

//middlewares peticiones http aceptar formularios
app.use(session({
	secret:'jasjas',
	resave: false,
	saveUninitilized: false,
	store: new MySQLStore(database)
}))
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//variables globales

app.use((req, res, next)=>{
	//ejecutamos next para 
	//que continue con el resto de código
	//variable para los mensajes
	app.locals.correcto = req.flash('correcto')
	next()
})

//rutas
app.use(require('./rutas/index'))//tenemos que exportar el metodo Router
app.use(require('./rutas/autenticacion'))
app.use('/links', require('./rutas/links'))

//archivos publicos
app.use(express.static(path.join(__dirname, 'public')))
//iniciar servidor

app.listen(app.get('port'),()=>{
	console.log(`ecuchando en el puerto ${app.get('port')}`)
});