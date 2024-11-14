
document.addEventListener("DOMContentLoaded",function(){

    const percentageSlider = document.getElementById("percentageSlider");

    const percetageValue = document.getElementById("percentageValue");

    percentageSlider.addEventListener("input",function(){
        percetageValue.textContent = `${percentageSlider.value}%`;
    });

});



function calculatePercentage(){

    const percentageSlider = document.getElementById("percentageSlider").value;

    const baseNumber = document.getElementById("baseNumber").value;

    if(baseNumber ===""){
        alert("Please enter a base number");
        return
    }

    const result = (parseFloat(baseNumber) * parseFloat(percentageSlider) /100).toFixed(2);

    document.getElementById("result").innerHTML = `Result: ${result}`;
}