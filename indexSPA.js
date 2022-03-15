'use strict';
const http=require('http');
const path=require('path');
//const cors=require('cors');
const express=require('express');

const app=express();
const {port,host}=require('./config.json');
//const fetch=require('node-fetch');
//npm install node-fetch@2
const fetch=require('./fetchlib');
const server=http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'menu.html')))


app.get('/getAll',(req,res)=>{
    fetch('http://localhost:4000/api/turtles',{mode:'cors'})
    .then(data=>data.json())
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
});

app.post('/getOne',(req,res)=>{
    const turtleId=req.body.number;
    if(turtleId && turtleId.length>0){
fetch(`http://localhost:4000/api/turtles/${turtleId}`,{mode:'cors'})
.then((data)=>data.json())
.then((result)=>res.json(result))
.catch((err)=>res.json(err));

    }else {
        res.json({message:'empty id',type:'error'});
    }

});

app.post('/remove',(req,res)=>{
    const turtleId=req.body.number;
    if(turtleId && turtleId.length>0){
fetch(`http://localhost:4000/api/turtles/${turtleId}`,{method:'DELETE',mode:'cors'})
.then((data)=>data.json())
.then((result)=>res.json(result))
.catch((err)=>res.json(err));

    }else {
        res.json({message:'empty id',type:'error'});
    }

});

app.post('/add',(req,res)=>{
    const turtle=req.body;
    const options={
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify(turtle)
    };
    fetch('http://localhost:4000/api/turtles',options)
    .then((data)=>data.json())
    .then((result)=>res.json(result))
    .catch((err)=>res.json(err));
});

app.post('/update',(req,res)=>{
    const turtle=req.body;
    const options={
        method:'PUT',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify(turtle)
    };
    fetch(`http://localhost:4000/api/turtles/${turtle.number}`,options)
    .then((data)=>data.json())
    .then((result)=>res.json(result))
    .catch((err)=>res.json(err));
});

app.all('*',(req,res)=>res.json('not supported'));
server.listen(port,host,()=>console.log(`server listening${host}:${port}`));