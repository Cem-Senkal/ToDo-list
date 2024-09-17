const ToDoInput = document.getElementById("ToDoInput");
const ToDoButton = document.getElementById("ToDoButton");
const clearAllToDoButton = document.getElementById("clearAllToDoButton");
const ToDoList = document.getElementById("ToDoList");

let data = [];

clearAllToDoButton.addEventListener("click", () => {
    ToDoList.innerHTML = "";
    data = [];
    localStorage.clear();
});

ToDoButton.addEventListener("click", () => {
    checkInputValue()
});

ToDoInput.addEventListener("keypress", (event) => {
    event.key === "Enter" && checkInputValue()
})

const checkInputValue = () => {
    if (ToDoInput.value != "") {
        createToDo();
        ToDoInput.value = "";
    } else {
        ToDoInput.placeholder = "Please add ToDo";
        setTimeout(() => {
            ToDoInput.placeholder = "";
        }, 1500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length != 0) {
        const parseData = JSON.parse(localStorage.getItem("ToDoData"));
        parseData.forEach((element) => {
            createToDo(element.value);
        });
    }
});

const createToDo = (localStorageValue) => {
    const alert = document.createElement("div");
    alert.setAttribute(
        "class",
        "alert alert-light d-flex justify-content-between align-items-center"
    );
    alert.setAttribute("style", "padding: 20px 30px;");
    ToDoList.appendChild(alert);

    const text = document.createElement("div");
    text.setAttribute(
        "style",
        "word-wrap: break-word; width: 90%; text-decoration: none;"
    );
    text.textContent = ToDoInput.value || localStorageValue;
    alert.appendChild(text);

    const buttons = document.createElement("div");
    buttons.className = "d-flex gap-3";
    alert.appendChild(buttons);

    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.addEventListener("change", () => {
        isChecked();
    });
    buttons.appendChild(checkbox);

    const remove = document.createElement("button");
    remove.className = "btn-close";
    remove.type = "button";
    remove.addEventListener("click", () => {
        removeToDo();
    });
    buttons.appendChild(remove);

    const isChecked = () => {
        if (checkbox.checked == true) {
            text.style.textDecoration = "line-through";
        } else {
            text.style.textDecoration = "none";
        }
    };

    const removeToDo = () => {
        alert.remove();
        let findIndex = data.findIndex((item) => item.value == text.textContent);
        data.splice(findIndex, 1);
        localStorage.setItem("ToDoData", JSON.stringify(data));
    };

    data.push({ value: text.textContent });
    localStorage.setItem("ToDoData", JSON.stringify(data));
};
