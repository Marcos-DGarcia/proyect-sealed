// IMPORTO LA DEPENDENCIA
const mysql = require('mysql2');
// CONEXION DE BASE DE DATOS CREACION DE TABLA.
const conexion = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORTBD,
    user: process.env.USER,
    password: process.env.PASSWORD
});
conexion.connect((err)=>{
    if (err){
        console.log(`El error es: ${err}`);    
    }else{
        console.log(`conectado a la base de datos`);
        conexion.query("create database sealed",function(err){
            if(err) throw err;
            console.log(`Base de datos creada`);
        })
    }
})