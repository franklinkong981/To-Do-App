const ul = document.querySelector("#to-do-list");
const form = document.querySelector("#add-item-form");
const inputField = document.querySelector("#add-item");
const clearButton = document.querySelector("#clear-button")

let toDoArray = [];
let isCheckedArray = [];
if (localStorage.getItem("toDoList")) {
    toDoArray = JSON.parse(localStorage.getItem("toDoList"));
}
if (localStorage.getItem("isCheckedList")) {
    isCheckedArray = JSON.parse(localStorage.getItem("isCheckedList"));
}

for (let i = 0; i < toDoArray.length; i++) {
    const existingListItem = makeExistingListItem(toDoArray[i], isCheckedArray[i]);
    ul.append(existingListItem);
}

function makeExistingListItem(itemToDo, isMarked) {
    const newLi = document.createElement("li");
    newLi.classList.add("list-item");
    const newSpan = document.createElement("span");
    newSpan.innerText = itemToDo;
    newLi.append(newSpan);
    const markButton = document.createElement("button");
    if (isMarked) {
        markButton.innerText = "Unmark";
        newSpan.classList.add("marked");
    }
    else {
        markButton.innerText = "Mark as Complete";
    }
    markButton.classList.add("mark-button");
    newLi.append(markButton);
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("remove-button");
    newLi.append(removeButton);
    return newLi;
}



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
    newLi.classList.add("list-item");
    const newSpan = document.createElement("span");
    newSpan.innerText = itemToDo;
    newLi.append(newSpan);
    addItemToLocalStorage(itemToDo);
    const markButton = document.createElement("button");
    markButton.innerText = "Mark as Complete";
    markButton.classList.add("mark-button");
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("remove-button");
    newLi.append(markButton);
    newLi.append(removeButton);
    return newLi;
}

function addItemToLocalStorage(itemToDo) {
    toDoArray.push(itemToDo);
    localStorage.setItem("toDoList", JSON.stringify(toDoArray));
    isCheckedArray.push(false);
    localStorage.setItem("isCheckedList", JSON.stringify(isCheckedArray));
}

ul.addEventListener("click", function(e) {
    if (e.target.classList.contains("mark-button")) {
        const listItemToMark = e.target.previousElementSibling;
        if (e.target.innerText === "Mark as Complete") {
            e.target.innerText = "Unmark";
            checkItemInLocalStorage(listItemToMark.innerText);
            listItemToMark.classList.add("marked");
        }
        else {
            e.target.innerText = "Mark as Complete";
            listItemToMark.classList.remove("marked");
            uncheckItemInLocalStorage(listItemToMark.innerText);
        }
    }
    else if (e.target.classList.contains("remove-button")) {
        const listItemToDelete = e.target.parentElement;
        const listItemTextElement = e.target.previousElementSibling.previousElementSibling;
        removeItemFromLocalStorage(listItemTextElement.innerText);
        listItemToDelete.remove();
    }
});

function removeItemFromLocalStorage(itemToDo) {
    let indexToRemove = toDoArray.indexOf(itemToDo);
    toDoArray.splice(indexToRemove,1);
    localStorage.setItem("toDoList", JSON.stringify(toDoArray));
    isCheckedArray.splice(indexToRemove,1);
    localStorage.setItem("isCheckedList", JSON.stringify(isCheckedArray));
}

function checkItemInLocalStorage(itemToDo) {
    indexToCheck = toDoArray.indexOf(itemToDo);
    isCheckedArray[indexToCheck] = true;
    localStorage.setItem("isCheckedList", JSON.stringify(isCheckedArray));
}

function uncheckItemInLocalStorage(itemToDo) {
    indexToUncheck = toDoArray.indexOf(itemToDo);
    isCheckedArray[indexToUncheck] = false;
    localStorage.setItem("isCheckedList", JSON.stringify(isCheckedArray));
}

clearButton.addEventListener("click", function() {
    clearList();
    localStorage.clear();
    toDoArray = [];
    isCheckedArray = [];
});

function clearList() {
    const listItemsToClear = document.getElementsByClassName("list-item");
    const numberItemsToClear = listItemsToClear.length;
    for (let i = 0; i < numberItemsToClear; i++) {
        listItemsToClear[0].remove();
    }
}
