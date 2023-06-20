const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session =require("express-session")
const cookieParser =require("cookie-parser");
const {spawn} = require("child_process");
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

app.get("/api/Destroy",(req,res)=>{
    req.session.destroy();
    res.json("Sesion cerrada");
})

app.post('/api/Register',(req,res) => {
    const Create ="INSERT INTO usuario(NombreUsuario,PassUsuario,Personalidad_idPersonalidad,E,I,S,N,F,T,P,J) values(?,?,?,?,?,?,?,?,?,?,?);";
    //(Modificar BD)
    const r = req.body
    db.query(Create,[req.body.name,req.body.password,req.body.personality,r.E,r.I,r.S,r.N,r.F,r.T,r.P,r.J],(err, data) => {
        if(err)  {
            console.log(err)
            return res.send(false);}
        else return res.send(true);
    })
});

app.post('/api/CreateU',(req,res) => {
    const Create ="INSERT INTO usuario(NombreUsuario,PassUsuario,Personalidad_idPersonalidad,E,I,S,N,F,T,P,J) values(?,?,?,?,?,?,?,?,?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.name,req.body.password,req.body.personality,req.body.e,req.body.i,req.body.s,req.body.n,req.body.f,req.body.t,req.body.p,req.body.j],(err, data) => {
        if(err)  return res.send(false);
        else return res.send(true);
    })
});

app.post('/api/CreateP',(req,res) => {
    const Create ="INSERT INTO lugar(Latitud,Longitud,Descripcion,Nombre,Imagenes,categorias_idCategorias) values(?,?,?,?,?,?);";
    //(Modificar BD)
    db.query(Create,[req.body.latitude,req.body.longitude,req.body.description,req.body.name,req.body.image,req.body.category],(err, data) => {
        if(err)  return res.send(false);
        else return res.send(true);
    })
});

app.delete('/api/DeleteU/:userName',(req,res) =>{
    const Delete = "DELETE FROM usuario WHERE  NombreUsuario= ?";
    db.query(Delete,req.params.userName,(err,data) =>{
        if(err) res.send(false);
        else res.send(true);
    })
});

app.delete('/api/DeleteL/:idLugar',(req,res) =>{
    const Delete = "DELETE FROM lugar WHERE  idLugar= ?";
    db.query(Delete,req.params.idLugar,(err,data) =>{
        if(err) res.send(false);
        else res.send(true);
    })
})

app.put('/api/UpdateU',(req,res) =>{
    const UPDATE = "UPDATE usuario  SET NombreUsuario = ?,PassUsuario= ?,Personalidad_idPersonalidad = ?,E=?,I=?,S=?,N=?,F=?,T=?,P=?,J=? WHERE NombreUsuario = ?";
    
    console.log(req.body.userName);
    console.log(req.body.pas);
    console.log(req.body.pers);
    console.log(req.body.oldUserName);
    console.log(req.body.e)
    console.log(req.body.i)
    console.log(req.body.s)
    console.log(req.body.n)
    console.log(req.body.f)
    console.log(req.body.t)
    console.log(req.body.p)
    console.log(req.body.j)

    db.query(UPDATE,[req.body.userName,req.body.pas,req.body.pers,req.body.e,req.body.i,req.body.s,req.body.n,req.body.f,req.body.t,req.body.p,req.body.j,req.body.oldUserName],(err,data) =>{
        if(err) res.send(false);
        else res.send(true);
       
    })
    
});

app.put('/api/UpdateP/:idLugar',(req,res) =>{
    const UPDATE = "UPDATE lugar  SET Latitud = ?,Longitud= ?,Descripcion = ?,Nombre = ?,Imagenes = ?,categorias_idCategorias=? WHERE idLugar = ?";
    db.query(UPDATE,[req.body.newlatitude,req.body.newlongitude,req.body.newdescription,req.body.newname,req.body.newimage,req.body.newcategory,req.params.idLugar],(err,data) =>{
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
    const getInfoL="SELECT * FROM lugar INNER JOIN  categorias ON  categorias_idCategorias =idCategorias";
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

app.get("/api/GetIdu" ,(req,res) => {
    const getId="SELECT * FROM usuario WHERE NombreUsuario = ?";
   
    db.query(getId,req.session.userid,(err,result) => {
       
        if(err) console.log("Error");
        res.send(result);
    });
});

app.post("/api/Reviews",(req,res)=>{
    const reviews="SELECT usuario.NombreUsuario,reseña.Puntuacion,reseña.Comentario,reseña.idReseña FROM usuario INNER JOIN usuarioreseña ON  usuario_NombreUsuario=NombreUsuario INNER JOIN lugar ON  idLugar=Reseña_Lugar_idLugar INNER JOIN reseña ON  idReseña=Reseña_idReseña WHERE idLugar= ?"
    console.log("aqui",req.body.idLugar)
    db.query(reviews,req.body.idLugar,(err,result)=>{
        
        if(err) console.log("Error en la recuperacion de reseñas del lugar");
        res.send(result);

    });
});

app.post("/api/Review",(req,res)=>{
    const review="INSERT INTO reseña (Puntuacion,Comentario,Lugar_idLugar) values (?,?,?)"
    db.query(review,[req.body.Puntuacion,req.body.Comentario,req.body.idLugar],(err,result) => {
        if(err) throw err
        db.query("SELECT idReseña FROM reseña WHERE Puntuacion = ? && Comentario = ? && Lugar_idLugar= ?",[req.body.Puntuacion,req.body.Comentario,req.body.idLugar],(err,result)=>{
            return res.send(result);
        })

    });
});

app.post("/api/PuntuacionG",(req,res)=>{
        const Puntuacion="SELECT count(Puntuacion) AS cuenta,sum(Puntuacion) AS suma FROM reseña WHERE Lugar_idLugar= ?"
        db.query(Puntuacion,[req.body.idLugar],(err,result)=>{
            console.log(req.session.rec1)
            console.log(req.session.rec2)
            if(err)  return console.log(err)
            
            return res.send(result)
        })
});

app.post("/api/SaveR",(req,res)=>{
    const sreview="INSERT INTO usuarioreseña values(?,?,?)"
    
    db.query(sreview,[req.body.idReseña,req.body.idLugar,req.session.userid],(err,result)=>{
        
        if(err) console.log("Error");
        res.send("Se recibio la reseña ;D");

    })
});

app.post("/api/getReco",(req,res)=>{
    console.log(req.body)
    if(typeof req.session.rec1 !="undefined" || typeof req.session.rec2 !="undefined"){
        const getInfoL="SELECT * FROM lugar INNER JOIN  categorias ON  categorias_idCategorias =idCategorias where idCategorias = ? or idCategorias = ?";
        db.query(getInfoL,[req.session.rec1,req.session.rec2],(err,result) => {
           
            if(err) console.log("Error");
            else res.send(result);
        
        });
    }else{
        const r = req.body.test
        const py = spawn('python',['test.py', r.E,r.I,r.S,r.N,r.F,r.T,r.P,r.J])
       
        py.stdout.on('data', (data) =>{
            const recomendacion = data.toString().replace(/\s/g,'')
            const reco1 = Number(recomendacion[0])+1
            const reco2 = Number(recomendacion[1])+1
            console.log(recomendacion[0],recomendacion[1])
            const getInfoL="SELECT * FROM lugar INNER JOIN  categorias ON  categorias_idCategorias =idCategorias where idCategorias = ? or idCategorias = ?";
            db.query(getInfoL,[reco1,reco2],(err,result) => {
                req.session.rec1=reco1
                req.session.rec2=reco2
                console.log(req.session.rec2)
                console.log(req.session.rec1)
                if(err) console.log("Error");
                else res.send(result); 
        });    
        })
    
        py.on('close', (code)=>{
            console.log(`child process exited with code ${code}`)
        }) 
    }
});


app.get("/api",(req,res)=>{
        res.send(req.session.userid)
});

app.listen(3030,()=>{
    console.log(`Servidor escuchando desde 3030`);
});