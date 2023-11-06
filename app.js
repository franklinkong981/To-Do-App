const ul = document.querySelector("#to-do-list");
const form = document.querySelector("#add-item-form");
const inputField = document.querySelector("#add-item");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (inputField.value === "") {
        alert("Please enter something to do!");
    } else {
        ul.append(addNewListItem(inputField.value));
        inputField.value = "";
    }
});

function addNewListItem(itemToDo) {
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");
    newSpan.innerText = itemToDo;
    newLi.append(newSpan);
    const markButton = document.createElement("button");
    markButton.innerText = "Mark as Complete";
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    newLi.append(markButton);
    newLi.append(removeButton);
    return newLi;
}