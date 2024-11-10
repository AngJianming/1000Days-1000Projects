const element = document.getElementsByTagName('li');
const screen = document.querySelector('p');
const clear = document.getElementById('clear');


for(let i = 0;i<element.length; i+=1){ // i++
    if(element[i].innerHTML === '='){
        element[i].addEventListener("click",calculate(i));
    }else{
        element[i].addEventListener("click",addToCurrentValue(i));
    }
}


function addToCurrentValue(i){
    return function(){
        if(element[i].innerHTML === "x"){ 
            screen.innerHTML += '*';
        }else{
            screen.innerHTML += element[i].innerHTML;
        }
    }
}

function calculate(i){
    return function(){
        screen.innerHTML = eval(screen.innerHTML);
    }
}

clear.onclick = function(){
    screen.innerHTML = " ";
}