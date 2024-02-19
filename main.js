var incomplete_tasks = 0;
const current_tasks = [];

var submitted_task = false;

document.addEventListener('DOMContentLoaded', function(){
    UpdateTasks();
})

function UpdateTasks(){
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

    var taskItem = document.createElement('a');
    taskItem.setAttribute('href', '#');
    taskItem.classList.add('list-group-item');

    var taskTitle = document.createElement('h4');
    taskTitle.classList.add('list-group-item-heading');
    taskTitle.textContent = title;

    var taskDescription = document.createElement('p');
    taskDescription.classList.add('list-group-item-text');
    taskDescription.textContent = 'Priority: ' + priority + ', Status: ' + status;

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDescription);

    current_tasks.push(taskItem);
    task_list.appendChild(taskItem);
}

function SubmitTask(){
    var task = {title:"", priority:"", status:""};

    task.title = document.getElementById('task-title').value;
    task.priority = document.querySelector('input[name="priority"]:checked').value;
    task.status = document.querySelector('input[name="status"]:checked').value;

    if (task.status === "Pending") {
        incomplete_tasks = incomplete_tasks + 1;
    }

    UpdateTasks();
    AddTask(task.title, task.priority, task.status);
}