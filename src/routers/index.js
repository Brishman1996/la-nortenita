const { render } = require('ejs');
const fs = require('fs') //Interactuar con el sistema de archivos
const express = require('express');
const { endianness } = require('os');
const router = express.Router()
const client = require('../libs/connect')()



router.get('/', (req, res) => {
   res.render('index',{title : 'Iniciar Sesión',layout: './layouts/default'});
   // console.log(req.body)
})
router.get('/dashboard', (req, res) => {
   res.render('dashboard', {title: 'Dashboard', slug: ''});
   
})

router.get('/dashboard/almacen', (req, res) => {
   res.render('almacen', {title: 'Almacén', slug: '/ Almacen'});
});

router.get('/dashboard/recursos-humanos', (req, res) => {
   res.render('recursos-humanos', {title: 'RRHH', slug: '/ Recursos Humanos'});
});
/*CARTAS*/
router.get('/dashboard/cartas', (req, res) => {
   
   let listaCartas;

   //Conectar base de datos
   client.connect(async (err) => {
      if (!err) {
         const collection = client.db("restaurante").collection("carta")
         collection.find().toArray((err, result) => {
            if (!err) {
               res.render('cartas', { title: 'Cartas', slug: '/ Cartas', cartas: result });
            } else {
               console.log('Error al traer la data \n' + err);
            }
         })
      } else {
         console.log('Error al cargar \n' + err);
      }
   })
});

/*REGISTRAR USUARIO*/
router.get('/registrar',(req, res)=>{
   res.render('registrar',{title:'Registrar', layout: './layouts/default'});
   
});
router.post('/registrar',(req, res)=>{
      let nombre = req.body.nombre;
      let rol = req.body.rol;
      let correo = req.body.correo;
      let contrasena = req.body.contrasena;
      console.log(req.body);

      client.connect(async (err) => {
      if (!err) {
         console.log("Se conecto a la coleción de usuarios");
         const collection = client.db("restaurante").collection("usuarios");
         collection.insertOne(req.body);
 
         res.redirect('/');
      }
   });
});


router.post('/login-user', (req, res) => {
   var correoForm = req.body.correo;
   var passwordForm = req.body.contrasena;
   //console.log(correoForm,passwordForm);

   //Conectar base de datos
   client.connect(async (err) => {
      if (!err) {
         const collection = await client.db("restaurante").collection("usuarios")
         collection.find({ correo: correoForm, contrasena: passwordForm }).toArray((err, result) => {
            if (!err) {
               //capturar dato
               let usuario = result[0];
               res.redirect('/dashboard');
               //res.location('dashboard')

            } else {
               console.log('Error al traer la data \n' + err);
            }
         })
      } else {
         console.log('Error al cargar \n' + err);
      }
   })
});

module.exports = router;