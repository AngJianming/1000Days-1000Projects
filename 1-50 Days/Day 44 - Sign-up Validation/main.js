function Validation(){
    var userName = document.getElementById('userName').value;
    if(userName == null || userName == ""){
        alert('sorry username is required');
    }
    else{
        console.log('sorry do not have a valid id');
    }
}