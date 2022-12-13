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
// LEO DATOS : SELECT 
conexion.connect((err)=>{
    if (err){
        console.log(`El error es: ${err}`);    
    }else{
        console.log(`conectado a la base de datos`);
        //let sql = "select * from clientes where direccion = '";
        let sql = "select * from clientes";
        conexion.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
        })
    }
})