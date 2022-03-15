'use strict';



(function(){
 
 let inputfield;

 let idField;
let nameField;
let ageField;
let weightField;
let speedField;

 document.addEventListener('DOMContentLoaded',init);
 function init(){
     
     inputfield=document.getElementById('number');
     document.getElementById('submit').addEventListener('click',send);
     document.getElementById('buttonUpdate').addEventListener('click',update);
 }

 async function update(){
    clearMessagearea();
    idField=document.getElementById('turtleNumber');
    nameField=document.getElementById('name');
    ageField=document.getElementById('age');
    weightField=document.getElementById('weight');
    speedField=document.getElementById('speed');
    const turtle={
        number:idField.value,
        name:nameField.value,
        age:ageField.value,
        weightKg:weightField.value,
        speed:speedField.value
    }

    try{
const options={
    method:'POST',
    body:JSON.stringify(turtle),
    headers:{'Content-type':'application/json'
}
};
const data=await fetch('/update',options);
const resultJson=await data.json();
if(resultJson.message){
    updateMessagearea(resultJson.message,resultJson.type);
}
    }catch(error){
        updateMessagearea(error.clearMessagearea,'error');
    }
}
async function send(){
    clearMessagearea();
   
    const number=inputfield.value;
    
    try{
const options={
    method:'POST',
    body:JSON.stringify({number}),
    headers:{
        'Content-Type':'application/json'
    }

};
const data=await fetch('/getOne',options);
const resultJson=await data.json();
updatePage(resultJson);
    }catch(error){
    updateMessagearea(error.message,'error');
}
}
function updatePage(result){
    if(result){
        if(result.message){
            updateMessagearea(result.message,result.type);
        } else {
            updateComputer(result);
        }
    }
}
function updateComputer(turtle){
    console.log('turtle number',turtle.number);
    document.getElementById('update').style.display="grid";
    
    document.getElementById('name').value=turtle.name;
    document.getElementById('age').value=turtle.age;
    document.getElementById('weight').value=turtle.weightKg;
    document.getElementById('speed').value=turtle.speed;
    document.getElementById('turtleNumber').value=turtle.number;
}
})();