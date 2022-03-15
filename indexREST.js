'use strict';

const http=require('http');
const path=require('path');
const cors=require('cors');
const express=require('express');

const app=express();
const {host,port}=require(path.join(__dirname,'./configRest.json'));

const DataStorage=require(path.join(__dirname,'storage','dataStorageLayer.js'));

const storage=new DataStorage();
const server=http.createServer(app);
app.use(cors());
app.use(express.json());

app.get('/api/turtles',(req,res)=>
    storage.getAll().then(result=>res.json(result))
    .catch(err=>res.json(err)));
    
    app.get('/api/turtles/:number',(req,res)=>
    
    storage.get(req.params.number)
    .then(result=>res.json(result))
    .catch(err=>
        
        res.json(err))
)
   app.delete('/api/turtles/:number',(req,res)=>
    storage.remove(req.params.number).then(result=>res.json(result))
    .catch(err=>res.json(err))); 

    app.post('/api/turtles',(req,res)=>{
        const turtle=req.body;
        storage.insert(turtle)
        .then(status=>res.json(status))
        .catch(err=>res.json(err));
    });
    app.put('/api/turtles/:number',(req,res)=>{
        const turtle=req.body;
        const number=req.params.number;
        storage.update(number,turtle)
        .then(status=>res.json(status))
        .catch(err=>res.json(err));
    });
app.all('*',(req,res)=>res.json('resource not supported'));

    server.listen(port,host,()=>console.log(`server ${host}:${port} is listening`));

    