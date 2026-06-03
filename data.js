const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach(item => {

  item.addEventListener("click", () => {

    menuItems.forEach(li => {
      li.classList.remove("active");
    });

    item.classList.add("active");

  });

});
function openModal(){
    document.getElementById("productModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("productModal").style.display = "none";
}