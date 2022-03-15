     'use strict';
  
     (function(){
let numberField;
let nameField;
let ageField;
let weightField;
let speedField;

document.addEventListener('DOMContentLoaded',init);

function init(){
    numberField=document.getElementById('number');
    nameField=document.getElementById('name');
    ageField=document.getElementById('age');
    weightField=document.getElementById('weight');
    speedField=document.getElementById('speed');


    document.getElementById('submit').addEventListener('click',send);

}

async function send(){
    clearMessagearea();
    const turtle={
        number:numberField.value,
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
const data=await fetch('/add',options);
const resultJson=await data.json();
if(resultJson.message){
    updateMessagearea(resultJson.message,resultJson.type);
}
    }catch(error){
        updateMessagearea(error.clearMessagearea,'error');
    }
}

     })()