'use strict';



(function(){
 let resultarea;
 let inputfield;

 document.addEventListener('DOMContentLoaded',init);
 function init(){
     resultarea=document.getElementById('resultarea');
     inputfield=document.getElementById('number');
     document.getElementById('submit').addEventListener('click',send);

 }

async function send(){
    clearMessagearea();
    resultarea.innerHTML='';
    const number=inputfield.value;
    console.log(number);
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
    resultarea.innerHTML=`
<p><span class="legend">Number:</span>${turtle.number}</p>
<p><span class="legend">Name:</span>${turtle.name}</p>
<p><span class="legend">Age:</span>${turtle.age}</p>
<p><span class="legend">Weight:</span>${turtle.weightKg}</p>
<p><span class="legend">Speed:</span>${turtle.speed}</p>
`;
}
})();