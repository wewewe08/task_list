var incomplete_tasks = 0;
var submitted_task = false;

var current_tasks = [];

document.addEventListener('DOMContentLoaded', function(){
    UpdateTasks();
})

function UpdateTasks() {
    if (incomplete_tasks > 0) {
        document.querySelector('#list-header').innerHTML = `There are tasks to be completed!`
        document.querySelector('#list-description').innerHTML = `You currently have ${incomplete_tasks} task(s) to complete.`
    }
    else {
        document.querySelector('#list-header').innerHTML = `All tasks completed!`
        document.querySelector('#list-description').innerHTML = `You currently do not have any upcoming tasks`
    }
}

function AddButton(id, text) {
    var taskButton = document.createElement('button');
    document.createElement('button');

    taskButton.classList.add('list-group-item-action');
    taskButton.classList.add('btn');
    taskButton.id = id;
    taskButton.textContent = text;

    return taskButton;
}

function AddTask(task) {
    var task_list = document.getElementById("task-list");

    var taskItem = document.createElement('p');
    taskItem.classList.add('list-group-item');

    var taskTitle = document.createElement('h4');
    taskTitle.classList.add('list-group-item-heading');
    taskTitle.id = task.status;
    taskTitle.textContent = task.title;

    var taskDescription = document.createElement('p');
    taskDescription.classList.add('list-group-item-text');
    taskDescription.textContent = 'Priority: ' + task.priority + ', Status: ' + task.status;

    var taskDeleteButton = AddButton("delete-task", "Remove task")
    taskDeleteButton.classList.add('btn-danger');

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);

    if (task.status === "Pending") {
        var taskCompleteButton = AddButton("complete-task", "Mark task as 'Completed'");
        taskCompleteButton.classList.add('btn-info');
        taskItem.appendChild(taskCompleteButton);

        taskCompleteButton.addEventListener("click", function() {
            task.status = CompleteTask(task, taskTitle, taskDescription, taskCompleteButton);
        })
    }

    taskItem.appendChild(taskDeleteButton);
    task_list.appendChild(taskItem);
    current_tasks.push(taskItem);

    taskDeleteButton.addEventListener("click", function() {
        DeleteTask(taskItem, task.status);
    })
}

function CompleteTask(task, title, description, button) {
    task.status = "Completed";
    description.textContent = 'Priority: ' + task.priority + ', Status: ' + task.status;
    title.id = task.status;
    button.remove();

    incomplete_tasks = incomplete_tasks - 1;
    UpdateTasks()

    return task.status;
}

function DeleteTask(item, status) {
    if (status === "Pending") {
        incomplete_tasks = incomplete_tasks - 1;
        UpdateTasks();
    }

    item.remove();
    current_tasks.pop(item);
}

function GetRadioValue(name){
    var radio_buttons = document.getElementsByName(name);

    for (i = 0; i < radio_buttons.length; i++){
        if (radio_buttons[i].checked) {
            return radio_buttons[i].value;
        }
    }
}

function SubmitTask() {
    var task = {
        title:"", 
        priority:"", 
        status:""
    };
    
    var has_title = document.getElementById('task-title');
    var has_priority = document.querySelector('input[name="priority"]:checked')
    var has_status = document.querySelector('input[name="status"]:checked')

    if (!has_title.value || !has_priority || !has_status) {
        alert("All fields must be selected!");
        return;
    }
    else {
        task.title = has_title.value;
        task.priority = GetRadioValue("priority");
        task.status = GetRadioValue("status");
    }

    if (task.status === "Pending") {
        incomplete_tasks = incomplete_tasks + 1;
    }

    UpdateTasks();
    AddTask(task);
}