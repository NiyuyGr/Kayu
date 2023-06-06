const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session =require("express-session")
const cookieParser =require("cookie-parser");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true,
})
);
app.use(express.json());
app.use(cookieParser());


const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "Kayu"
});

app.use(session({
    secret: 'secret',
    name: 'usuario',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure:false,
        maxAge: 1000*60*60*24,
        
    }
}));
app.post('/api/Login',(req,res) => {

    const sql ="SELECT * FROM usuario WHERE NombreUsuario = ? AND PassUsuario = ?;";
    db.query(sql, [req.body.user, req.body.password], (err, result) => {
       if(err) return res.text("Error en el login")
       if(result.length > 0){ 
         req.session.userid=req.body.user
          console.log(req.session)      
        return res.json({Login:true,User:req.body.user});

       }else{
         return res.json({Login:false});
        }
    })
});

app.post('/api/Register',(req,res) => {
    const Create ="INSERT INTO usuario(NombreUsuario,PassUsuario,Personalidad_idPersonalidad) values(?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.name,req.body.password,req.body.personality],(err, data) => {
        if(err)  return res.send("Error en Registrar usuario");
        else return res.send("Usuario registrado con exito");
    })
});

app.post('/api/CreateU',(req,res) => {
    const Create ="INSERT INTO usuario(NombreUsuario,PassUsuario,Personalidad_idPersonalidad) values(?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.name,req.body.password,req.body.personality],(err, data) => {
        if(err)  return res.send("Error en Crear");
        else return res.send("Creado con exito");
    })
});
app.post('/api/CreateP',(req,res) => {
    const Create ="INSERT INTO lugar(Latitud,Longitud,Descripcion,Nombre,Imagenes) values(?,?,?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.latitude,req.body.longitude,req.body.description,req.body.name,req.body.image],(err, data) => {
        if(err)  return res.send("Error en Crear");
        else return res.send("Creado con exito");
    })
});

app.delete('/api/DeleteU/:userName',(req,res) =>{
    const Delete = "DELETE FROM usuario WHERE  NombreUsuario= ?";
    db.query(Delete,req.params.userName,(err,data) =>{
        if(err) res.json(" No se hizo ninguna eliminacion :(");

    })
});
app.delete('/api/DeleteL/:idLugar',(req,res) =>{
    const Delete = "DELETE FROM lugar WHERE  idLugar= ?";
    db.query(Delete,req.params.idLugar,(err,data) =>{
        if(err) res.json(" No se hizo ninguna eliminacion :(");

    })
})
app.put('/api/UpdateU',(req,res) =>{
    const UPDATE = "UPDATE usuario  SET NombreUsuario = ?,PassUsuario= ?,Personalidad_idPersonalidad = ? WHERE NombreUsuario = ?";
    
    console.log(req.body.newname);
    console.log(req.body.newpassword);
    console.log(req.body.newpersonality);
    console.log(req.body.userName);
    db.query(UPDATE,[req.body.newname,req.body.newpassword,req.body.newpersonality,req.body.userName],(err,data) =>{
        if(err) res.json("No se actualizaron datos");
            
        res.json("Dato actualizado :D");
       
    })
    
});
app.put('/api/UpdateP/:idLugar',(req,res) =>{
    const UPDATE = "UPDATE lugar  SET Latitud = ?,Longitud= ?,Descripcion = ?,Nombre = ?,Imagenes = ? WHERE idLugar = ?";

    console.log(req.params.idLugar);
    console.log(req.body.newname);
    console.log(req.body.newlatitude);
    console.log(req.body.newlongitude);
    console.log(req.body.newdescription);
    console.log(req.body.newimage);
    
    db.query(UPDATE,[req.body.newlatitude,req.body.newlongitude,req.body.newdescription,req.body.newname,req.body.newimage,req.params.idLugar],(err,data) =>{
        if(err) res.json("No se actualizaron datos");
            
        res.json("Dato actualizado :D");
       
    })
    
});
app.get("/api/CrudG" ,(req,res) => {
    const getInfo="SELECT * FROM usuario";
    db.query(getInfo,(err,result) => {
        
        res.send(result);
    });
});
app.get('/api/CrudL',(req,res)=>{
    const getInfoL="SELECT * FROM lugar";
    db.query(getInfoL,(err,result) => {
        
        res.send(result);
    });
});
app.get("/api/GetId/:idLugar" ,(req,res) => {
    const getId="SELECT * FROM lugar WHERE idLugar = ?";
   console.log(req.params.idLugar);
    db.query(getId,req.params.idLugar,(err,result) => {
        console.log(result);
        if(err) console.log("Error");

        res.send(result);
    });
});

app.get("/api",(req,res)=>{
        res.send(req.session.userid)
});
app.get("/api/Destroy",(req,res)=>{
    req.session.destroy();
    res.json("nmms se cerro la sesion wwe");
})
app.listen(3030,()=>{
    console.log(`Servidor escuchando desde 3030`);
});