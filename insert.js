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
// AGREGO UN DATO 
conexion.connect((err)=>{
    if (err){
        console.log(`El error es: ${err}`);    
    }else{
        console.log(`conectado a la base de datos`);
        let sql = "insert into clientes (nombre,direccion) values ('Frig Cagnoli','La Plata')";
        let sql1 = "insert into clientes (nombre,direccion) values ('Deheza','Munro')";
        let sqq2 = "insert into clientes (nombre,direccion) values ('Frig Aljibe','Caba')";
        conexion.query(sql1,function(err){
            if(err) throw err;
            console.log(`Nuevo cliente cargado`);
        })
    }
})