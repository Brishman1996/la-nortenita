const path = require('path'); //Rutas
const express = require('express'); //Para server
const logger = require('morgan'); //Registro de solicitudes en consola desarrolador
const bodyParse = require('body-parser');//Leer contenedio de las solicitudes REST
const app = express();
const indexRoutes = require('./src/routers/index');
const expressLayouts = require('express-ejs-layouts'); //Gestion de diseño ejs Parciales

//Configuracion de servidor
app.set('port', process.env.PORT || 3000); //Asignando un puerto
app.set('views', path.join(__dirname, 'src/views')); //Definiendo la ruta de las vistas
app.set('view engine', 'ejs'); //Definiendo preprocesador HTML

/*Middlewares, se ejecutan primero antes de cualquier consulta*/
app.use(logger('dev')); //Mostrar el registro en consola
app.use(express.json()); //Aceptar JSON de body en las peticiones REST
app.use(bodyParse.urlencoded({extended:false})) //?

//Setear motor de plantillas
app.use(expressLayouts);
app.set('layout', './layouts/dashboard');

/*HABILITAR CARPETA PUBLICA*/
//app.use('/fonts',express.static(path.join(__dirname, 'public/fonts')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));

app.use('/', indexRoutes)

app.listen(app.get('port'), ()=>{
    console.log(`Servidor en puerto: ${app.get('port')}`);
});
