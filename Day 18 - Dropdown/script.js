const myBtn = document.getElementById("myBtn");
const myDropdown = document.getElementById("myDropdown");
const closeBtn = document.getElementById("closeBtn");
      
      myBtn.addEventListener("click", function() {

        myDropdown.classList.add("active");

      });

      closeBtn.addEventListener("click", function() {

        myDropdown.classList.remove("active");

      });