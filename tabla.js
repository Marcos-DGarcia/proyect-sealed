// IMPORTO LA DEPENDENCIA
const mysql = require('mysql2');
// CONEXION DE BASE DE DATOS
const conexion = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'MarcosGarcia1234.',
    database: 'sealed'
});
// CREO TABLA
conexion.connect((err)=>{
    if (err){
        console.log(`El error es: ${err}`);    
    }else{
        console.log(`conectado a la base de datos`);
        let sql = "create table clientes(nombre VARCHAR(100),direccion VARCHAR(100))"
        conexion.query(sql,function(err){
            if(err) throw err;
            console.log(`Tabla clientes creada`);
        })
    }
})