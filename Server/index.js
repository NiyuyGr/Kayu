const express= require("express");
const mysql =require("mysql");
const cors = require("cors");

const app= express();

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "mydb"
})

app.post('/Login',(req,res) => {
    
    const sql =`SELECT * FROM usuario WHERE NombreUsuario = ? AND PassUsuario = ?`;
    
    db.query(sql, [req.body.user, req.body.password], (err, data) => {
       if(err) return res.text("Error en el login");
       if(data.length > 0){
        return res.json("Login Exitosoo")

       }else{
       return res.json("Datos no encontrados")
        }
    })
})

app.get("/api",(req,res) => {
    res.json({ "users": ["usuario 1","usuario 2", "usuario 3", "usuario 4"] });
});



app.listen(3030,()=>{
    console.log(`Servidor escuchando desde 3030`);
});