var loadBtn = document.getElementById('Load');
var completedBtn = document.getElementById('Show')
var clearBtn = document.getElementById('clear');
var addBtn = document.querySelector('button');
var input = document.querySelector('input');
var listTask = document.querySelector('ul');
var savedTasks = [];
var completed =[];
var edited = [];
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
    editTask(editBtn,taskToDo,text);
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
        task.classList.add("bg-success");
        btn.textContent = "Uncomplete";
        completed.push(task.textContent);
        window.localStorage.setItem("Completed", completed);
    }
}
function showCompleted(){
    completed = JSON.parse(window.localStorage.getItem('Tasks'));
    if(completed){
        //udpate Tasks on screen
        for (var i = 0; completed.length > i; i++) {
        updateDisplay(completed[i].todo);
        }
    }else{
        alert('There is no task completed');
        completed = [];
    }
}


function editTask(btn,task,text){
    btn.onclick = function(){
        var inp = document.createElement('input');
        inp.setAttribute('class','form-control form-control-lg w-100');
        if(btn.textContent === "Edit"){
            task.appendChild(inp);
            inp.value = text.textContent;
            task.replaceChild(inp,text);
            btn.textContent = "Save"
        }else if (btn.textContent === "Save"){
            text.textContent = task.childNodes[0].value;
            task.replaceChild(text,task.childNodes[0]);
            btn.textContent = "Edit";
            edited.push(text.textContent);
            updateLocalSotrage();
        } 
    }
}
function updateLocalSotrage(){
    window.localStorage.setItem('Edited', JSON.stringify(edited));
}
function clearLocalStorage() {
    window.localStorage.removeItem('Tasks');
}
addBtn.addEventListener('click', addTask);
loadBtn.addEventListener('click', loadTask);
clearBtn.addEventListener('click', clearLocalStorage);
completedBtn.addEventListener('click', showCompleted);