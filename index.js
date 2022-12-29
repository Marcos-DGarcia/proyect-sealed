// IMPORTAMOS LAS DEPENDENCIAS O LA LIBRERIAS QUE NECESITEMOS
const express = require('express');
const hbs = require('hbs'); // MOTOR DE PLANTILLA
const path = require('path');// ENCONTRAR ARCHIVOS
const nodemailer = require('nodemailer');//ENVIAR EMAILS
const mysql = require('mysql2');
//VARIABLES DE ENTORNO
require('dotenv').config();
// EJECUTO LAS FUNCIONES DE EXPRESS EN LA VARIABLE
//CREO EL SERVIDOR
const app = express();
// ESTABLECEMOS UNA PUERTO PARA LA ESCUCHA DEL SERVIDOR (HTTP)
const PORT = process.env.PORT || 9000;
// MIDDELWARE 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CONFIGURAMOS EL MOTOR DE PLANTILLAS DE HBS
app.set(`view engine`, `hbs`);
// CONFIGURAMOS LA UBICACION DE LAS VISTAS
app.set(`views`, path.join(__dirname, `views`));
//CONFIGURAMOS LOS PARCIALES DE LOS MOTORES DE PLANTILLAS 
hbs.registerPartials(path.join(__dirname, `views/partials`));

// CONEXION A BASE DE DATOS
const conexion = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORTBD,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "sealed",
});
conexion.connect((err) => {
    if (err) {
        console.log(`El error es: ${err}`);
    } else {
        console.log(`conectado a la base de datos`);
    }
})

//CREO LAS RESPUESTAS AL CLIENTE
//-----------------------------------------------------------------
// GET
//--------------------------------------------------------------------
//HTML
app.get(`/`, (req, res) => {
    res.render('index', {
        titulo: 'index'
    });
})

app.get(`/formularioCarga`, (req, res) => {
    res.render('formularioCarga');
})

//TEXTO
app.get(`/home`, (req, res) => {
    //console.log(req);
    //console.log(req.url );
    //console.log(req.method );
    res.send('Estoy en home');
})
//JSON
app.get(`/datos`, (req, res) => {

    let sql = "select * from viajes";
        conexion.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.render('datos',{
                titulo: 'datos',
                datos: result
            });
        })

});
// ARCHIVOS tipo HTML 
app.get(`/index`, (req, res) => {

    res.sendFile('index.html', {
        root: __dirname + '/public'
    });
});
// CONTADOR PARA VER LAS VECES QUE SE ACCEDE A LA PAG
let = contador = 0;
app.get('/contador', (req, res) => {
    contador++;
    console.log(contador);
    res.send(`La cantidad de visitas a esta api es: ${contador} `)
});

//--------------------------------------------------------------------
// POST
//--------------------------------------------------------------------
app.post('/formularioCarga', (req, res) => {
    /* console.log(req); */
    let nombre = req.body.nombre;
    let email = req.body.email;
    async function envioMail() {
        
        let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAILP, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: `${email}` , // list of receivers
            subject: "Dato creado ✔", // Subject line
            html: "Gracias por visitar nuestra pagina <br>", // html body
            text: "Hello world?", // plain text body
        });
    }
    let datos = {
        nombre: nombre
    }
    let sq1 = "INSERT INTO viajes set ? ";

    conexion.query(sq1, datos, function (err) {
        if (err) throw err;
        console.log(`Nuevo cliente cargado`);
        envioMail().catch(console.error);
        res.render('enviado');
    })
    console.log(nombre);
});

// FUNCION QUE ACTIVA UN SERVIDOR Y LO TIENE LISTO PARA PETICIONES
app.listen(PORT, () => {
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





