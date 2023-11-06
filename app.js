const form = document.querySelector("#add-item-form");
const inputField = document.querySelector("#add-item");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (inputField.value === "") {
        alert("Please enter something to do!");
    } else {
        inputField.value = "";
        console.log("Item added!");
    }
})