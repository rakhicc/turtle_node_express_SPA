'use strict';

//const fetch = require('./fetchlib');

(function(){

    document.addEventListener('DOMContentLoaded',init);
async function init(){
try{
const data=await fetch('/getAll');//default get
const turtles=await data.json();

const resultset=document.getElementById('resultset');
for(let turtle of turtles){
    const tr=document.createElement('tr');
    tr.appendChild(createCell(turtle.number));
    tr.appendChild(createCell(turtle.name));
    tr.appendChild(createCell(turtle.age));
    tr.appendChild(createCell(turtle.weightKg));
    tr.appendChild(createCell(turtle.speed));
    resultset.appendChild(tr);
}
} catch(error){
    document.getElementById('messagearea').innerHTML=
    `<p class="error>${error.message}</p>`;
}
}

function createCell(data){
    const td=document.createElement('td');
    td.textContent=data;
    return td;
}

})()