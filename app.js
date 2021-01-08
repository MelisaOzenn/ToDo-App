//Selectors
const todoInput = document.querySelector(".todo-input"); //querySelector = returns first El.in document that matches specified selector
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
//addEventListener is a method
document.addEventListener('DOMContentLoaded',getTodos); //element: document 
todoButton.addEventListener('click', addTodo); //click: event 
todoList.addEventListener('click', deleteCheck); //function: deleteCheck
filterOption.addEventListener('click', filterTodo);
//removeEventListener()

/*Nodes:
parentNode
childNodes[nodenumber]
firstChild
lastChild
nextSibling
previousSibling*/

//Functions
function addTodo(event){

    //prevent form from submitting
    event.preventDefault();

    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);   //appendChild = add html element (newTodo int this case)

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear input value
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall"); //adding the fall effects
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        /*item.parentElement.remove(); can be done too
        if we remove item, it will only remove button
        so we have to go to the parent of it*/
    }
    //Check Mark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    /*if it is clicked as completed;
    go to the parent element,
    mark it as completed,
    fill a case of being "completed"*/
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display= "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check if it has something
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos")); //parse back into an array 
    }
    todos.push(todo); //psuh into local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    //check if it has something
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos")); //parse back into an array 
    }
    todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //check if it has something
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos")); //parse back into an array 
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); //remove 1 element
    localStorage.setItem("todos", JSON.stringify(todos));
}