// IMPORTO LA DEPENDENCIA
const mysql = require('mysql2');
// CONEXION DE BASE DE DATOS
const conexion = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'MarcosGarcia1234.'
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