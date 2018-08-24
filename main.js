var loadBtn = document.getElementById('Load');
var clearBtn = document.getElementById('clear');
var addBtn = document.querySelector('button');
var input = document.querySelector('input');
var listTask = document.querySelector('ul');
var savedTasks = [];
//adding tasks 
function addTask(task) {
    if(input.value ===""){
        input.style.border="1px red solid";
    }else{
        var task = {
            todo: input.value,
            complete: false,
        }
        savedTasks.push(task);
        window.localStorage.setItem('Tasks', JSON.stringify(savedTasks));
        //udpate Tasks on screen
        updateDisplay(task.todo);
        completeTask(task.complete);
    }
}
//updateDisplay function
function updateDisplay(task) {
    var taskToDo = document.createElement('li');
    taskToDo.setAttribute('class', 'd-block list-group-item  w-100');
    listTask.appendChild(taskToDo);
    var text = document.createElement('h1');
    taskToDo.appendChild(text);
    text.textContent = task;
    listTask.insertBefore(taskToDo, listTask.childNodes[0]);
    //deleteBtn
    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'btn btn-danger w-20');
    deleteBtn.textContent = "Delete";
    taskToDo.appendChild(deleteBtn);
    //editBtn
    editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'btn btn-info w-21');
    editBtn.textContent = "Edit";
    taskToDo.appendChild(editBtn);
    //completeBtn
    completeBtn = document.createElement('button');
    completeBtn.setAttribute('class', 'btn btn-info w-20');
    completeBtn.textContent = "Complete";
    taskToDo.appendChild(completeBtn);
    //function call
    deleteTask(deleteBtn, taskToDo);
    completeTask(completeBtn,taskToDo);
    editTask(editBtn,taskToDo);
    //input
    input.focus();
    input.value = '';
    input.style.border="none";

}
//load Tasks from LS
function loadTask() {
    savedTasks = JSON.parse(window.localStorage.getItem('Tasks'));
    if(savedTasks){
        //udpate Tasks on screen
        for (var i = 0; savedTasks.length > i; i++) {
        updateDisplay(savedTasks[i].todo);
        }
    }else{
        alert('There is no task saved');
        savedTasks = [];
    }
}
function deleteTask(btn, task) {
    btn.onclick = function (e) {
        savedTasks.splice(e.target);
        listTask.removeChild(task);
    };
}
function completeTask(btn, task) {
    btn.onclick = function () {
        if (btn.textContent === "Complete") {
            var completed =[];
            task.classList.add("bg-success");
            btn.textContent = "Uncomplete";
            window.localStorage.setItem("Completed", completed);
        } else {
            task.classList.remove("bg-success");
            btn.textContent = "Complete";
            window.localStorage.removeItem("Completed");
        }
    }
}
function editTask(btn,task){
    btn.onclick = function(){
        task.textContent[0] = 'Hello';
/*
        if(btn.textContent === "Edit"){
            Inp.setAttribute('class','form-control form-control-lg');
            btn.textContent = "Save"
        }else if (btn.textContent === "Save"){
            btn.textContent = "Edit";
        } 
    */}
}
function clearLocalStorage() {
    window.localStorage.clear();
}
addBtn.addEventListener('click', addTask);
loadBtn.addEventListener('click', loadTask);
clearBtn.addEventListener('click', clearLocalStorage);