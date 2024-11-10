const openModalBtnElemet = document.querySelector("#openModal");
const modalElement = document.querySelector(".modal");
const modalContentElement = document.querySelector(".modal_content");


openModalBtnElemet.addEventListener("click",()=>{
    modalElement.classList.add("open");
});

modalContentElement.addEventListener("click",()=>{
    modalElement.classList.remove("open");
});