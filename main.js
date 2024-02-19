var task = {title:"", priority:"", status:""};
var incomplete_tasks = 0;
const current_tasks = [];

document.addEventListener('DOMContentLoaded', function(){
    CheckTasks();
})

function CheckTasks(){
    if (incomplete_tasks > 0) {
        document.querySelector('#list-header').innerHTML = `There are tasks to be completed!`
        document.querySelector('#list-description').innerHTML = `You currently have ${incomplete_tasks} task(s) to complete.`
    }
    else {
        document.querySelector('#list-header').innerHTML = `All tasks completed!`
        document.querySelector('list-description').innerHTML = `You currently do not have any upcoming tasks`
    }
}

function SubmitTask(){
    task.title = document.getElementById('task-title').value;
}