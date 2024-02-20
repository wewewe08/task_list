var incomplete_tasks = 0;
const current_tasks = [];

var submitted_task = false;

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

function AddTask(title, priority, status) {
    var task_list = document.getElementById("task-list");

    var taskItem = document.createElement('p');
    taskItem.classList.add('list-group-item');

    var taskTitle = document.createElement('h4');
    taskTitle.classList.add('list-group-item-heading');
    taskTitle.textContent = title;

    var taskDescription = document.createElement('p');
    taskDescription.classList.add('list-group-item-text');
    taskDescription.textContent = 'Priority: ' + priority + ', Status: ' + status;

    var taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('list-group-item-action');
    taskDeleteButton.textContent = 'Remove task'

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);

    if (status === "Pending") {
        var taskCompleteButton = document.createElement('button');
        taskCompleteButton.classList.add('list-group-item-action');
        taskCompleteButton.textContent = 'Mark task as "Completed"'

        taskItem.appendChild(taskCompleteButton);
    }

    taskItem.appendChild(taskDeleteButton);

    current_tasks.push(taskItem);
    task_list.appendChild(taskItem);
}

function RemoveTask() {

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
    var task = {title:"", priority:"", status:""};
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
    AddTask(task.title, task.priority, task.status);
}