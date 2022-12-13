// IMPORTAMOS LAS DEPENDENCIAS O LA LIBRERIAS QUE NECESITEMOS
const express = require('express');
const hbs =  require('hbs'); // MOTOR DE PLANTILLA
const path = require('path');// ENCONTRAR ARCHIVOS
const nodemailer = require('nodemailer');//ENVIAR EMAILS

//VARIABLES DE ENTORNO
require('dotenv').config();
// EJECUTO LAS FUNCIONES DE EXPRESS EN LA VARIABLE
    //CREO EL SERVIDOR
const app = express();
// ESTABLECEMOS UNA PUERTO PARA LA ESCUCHA DEL SERVIDOR (HTTP)
const PORT = process.env.PORT;
// MIDDELWARE 
app.use = (express.json());
app.use = (express.urlencoded({extended: true}));
app.use = (express.static(path.join(__dirname,'public'))); 

// CONFIGURAMOS EL MOTOR DE PLANTILLAS DE HBS
app.set(`view engine`, `hbs`);
// CONFIGURAMOS LA UBICACION DE LAS VISTAS
app.set(`views`,path.join(__dirname,`views`));
//CONFIGURAMOS LOS PARCIALES DE LOS MOTORES DE PLANTILLAS 
hbs.registerPartials(path.join(__dirname,`views/partials`));

//CREO LAS RESPUESTAS AL CLIENTE
//-----------------------------------------------------------------
// GET
//--------------------------------------------------------------------
//HTML
app.get(`/`,(req,res)=> {
    res.send('<h1>INICIO</h1>');
})
//TEXTO
app.get(`/home`,(req,res)=> {
    //console.log(req);
    //console.log(req.url );
    //console.log(req.method );
    res.send('Estoy en home');
})
//JSON
app.get(`/datos`,(req,res)=> {
    
    res.json({
        usuario:'Marcos'
    
    });
});
// ARCHIVOS tipo HTML 
app.get(`/index`,(req,res)=> {
    
    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});
// CONTADOR PARA VER LAS VECES QUE SE ACCEDE A LA PAG
let = contador = 0;
app.get('/contador',(req,res)=>{
    contador ++;
    console.log(contador);
    res.send(`La cantidad de visitas a esta api es: ${contador} `)
});

//--------------------------------------------------------------------
// POST
//--------------------------------------------------------------------
app.post('/recibir',(req,res)=>{
    let nombre = req.body.nombre;
    console.log(req.body.nombre);
    res.send("Sus datos fueron recibidos");
});

// FUNCION QUE ACTIVA UN SERVIDOR Y LO TIENE LISTO PARA PETICIONES
app.listen(PORT, () =>{
    console.log(`Servidor trabajando el puerto ${PORT}`);
});
/*app.poss()
app.update();
app.delete();
*/
// LOGIN DE USUARIO
/*
app.post ('/login',,(req, res)=>){
    const user = req.body.user;
    const password = req.body.password;
    if(user === 'admin' && password === 'uqasdasd123'){
        res.render('admini');
    }else{
        res.render('error')
    }
}
*/





