const express= require("express");
const mysql =require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
})
);

app.use(express.json());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "Kayu"
})

app.post('/Login',(req,res) => {
    
    const sql ="SELECT * FROM usuario WHERE NombreUsuario = ? AND PassUsuario = ?;";
    
    db.query(sql, [req.body.user, req.body.password], (err, data) => {
       if(err) return res.text("Error en el login");
       if(data.length > 0){
        return res.json("Login Exitosoo")

       }else{
       return res.json("Datos no encontrados")
        }
    })
})

app.post('/Register',(req,res) => {
    const Create ="INSERT INTO usuario(NombreUsuario,PassUsuario,Personalidad_idPersonalidad) values(?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.name,req.body.password,req.body.personality],(err, data) => {
        if(err)  return res.send("Error en Registrar usuario");
        else return res.send("Usuario registrado con exito");
    })
})

app.post('/CreateU',(req,res) => {
    const Create ="INSERT INTO usuario(NombreUsuario,PassUsuario,Personalidad_idPersonalidad) values(?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.name,req.body.password,req.body.personality],(err, data) => {
        if(err)  return res.send("Error en Crear");
        else return res.send("Creado con exito");
    })
})

app.delete('/DeleteU/:userName',(req,res) =>{
    const Delete = "DELETE FROM usuario WHERE  NombreUsuario= ?";
    db.query(Delete,req.params.userName,(err,data) =>{
        if(err) res.json(" No se hizo ninguna eliminacion :(");

    })
})

app.put('/UpdateU',(req,res) =>{
    const UPDATE = "UPDATE usuario  SET NombreUsuario = ?,PassUsuario= ?,Personalidad_idPersonalidad = ? WHERE NombreUsuario = ?";
    console.log(req.body.newname);
    if (req.body.name==req.body.userName){
        res.json("no se realizo ningun cambio");

    }
    else{
    db.query(UPDATE,[req.body.newname,req.body.newpassword,req.body.newpersonality,req.body.userName],(err,data) =>{
        if(err) res.json("No se actualizaron datos");
            
        res.json("Dato actualizado :D");
       
    })
    }
})

app.get("/CrudG" ,(req,res) => {
    const getInfo="SELECT * FROM usuario";
    db.query(getInfo,(err,result) => {
        
        res.send(result);
    });
});


app.get("/GetId/:userName" ,(req,res) => {
    const getId="SELECT * FROM usuario WHERE NombreUsuario = ?";
   console.log(req.params.userName);
    db.query(getId,req.params.userName,(err,result) => {
        console.log(result);
        if(err) console.log("Error");

        res.send(result);
    });
});

app.listen(3030,()=>{
    console.log(`Servidor escuchando desde 3030`);
});