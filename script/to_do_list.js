
/* This function will read the task details added in inputs
    and add them in list of tasks  */
function addTaskContent(taskArr) {
    var ul = document.getElementById("tasksListUL");
    for (i = 0; i < taskArr.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(taskArr[i].title));
        li.id = taskArr[i].id;
        var descMainDiv = document.createElement("div");
        descMainDiv.id = "listDetails" + i;
        descMainDiv.className = "listDetails";
        li.appendChild(descMainDiv);
        /* If task status is completed then strike thorugh it */
        if (taskArr[i].status == 'completed') {
            li.className = 'checked';
        }
        /* fetch task description */
        var description = document.createElement("div");
        description.className = "listDetailsDiv";
        description.appendChild(document.createTextNode("Description: " + taskArr[i].description));
        descMainDiv.appendChild(description);
        /* fetch task due date */
        var dueDate = document.createElement("div");
        dueDate.className = "listDetailsDiv";
        dueDate.appendChild(document.createTextNode("Due Date: " + taskArr[i].due_date));
        descMainDiv.appendChild(dueDate);
        /* fetch task due time */
        var dueTime = document.createElement("div");
        dueTime.className = "listDetailsDiv";
        dueTime.appendChild(document.createTextNode("Due Time: " + taskArr[i].due_time));
        descMainDiv.appendChild(dueTime);
        /* Add close icon and view button */
        var viewSpan = document.createElement("SPAN");
        var viewTxt = document.createTextNode("View");
        viewSpan.id = "viewDetails" + i;
        viewSpan.className = "viewDetails";
        viewSpan.appendChild(viewTxt);
        li.appendChild(viewSpan);
        /* Add close icon */
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        ul.appendChild(li);
    }
}

/* Toggle Add new task button */
function showAddTaskSection() {
    if (document.getElementById("addItemDiv").style.display == "block") {
        document.getElementById("addItemDiv").style.display = "none";
    } else {
        document.getElementById("addItemDiv").style.display = "block";
    }
}

/* On click of close button remove task and its details from list  */
function closeButtonEvent() {
    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var viewDetails = document.getElementsByClassName("viewDetails");
    var i = 0;
    for (i = 0; i < close.length; i++) {
        /* Onclick of close, remove task */
        close[i].onclick = function () {
            if(confirm("Do you really want to remove this task?")){
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
        /* Onclick of view, See description of task */
        viewDetails[i].onclick = function () {
            var div = this.parentElement;
            if (div.querySelector(".listDetails").style.display == "block") {
                div.querySelector(".listDetails").style.display = "none";
            } else {
                div.querySelector(".listDetails").style.display = "block";
            }
        }
    }
}
/* On click of task make it completed */
function markTaskCompleted() {
    // Add a "checked" symbol when clicking on a list item
    var list = document.getElementById("tasksListUL");
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}
// Create a new list item when clicking on the "Add" button
function addNewTask() {
    var taskTitle = document.getElementById("taskTitle").value;
    /* Check if task title is filled */
    if (taskTitle === '') {
        alert("You must write something!");
    } else {
        var taskDesc = document.getElementById("taskDesc").value;
        var taskDueDate = document.getElementById("taskDueDate").value;
        var taskDueTime = document.getElementById("taskDueTime").value;
        /* On click of save store it in json array and add it to html list */
        var newArray = [
            {
                "title": taskTitle,
                "description": taskDesc,
                "due_date": taskDueDate,
                "due_time": taskDueTime
            },
        ];
        addTaskContent(newArray);
        closeButtonEvent();
        alert("Task added successfully");
    }
    document.getElementById('taskTitle').value = "";
    document.getElementById('taskDesc').value = "";
    document.getElementById('taskDueDate').value = "";
    document.getElementById('taskDueTime').value = "";
}
/* Read JSON file and fetch array of to-do list */
var xmlhttp = new XMLHttpRequest();
var url = "json/to_do_list.json";
var jsonArray = [];

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        jsonArray = JSON.parse(this.responseText);
        addTaskContent(jsonArray);
        /* On click of close icon, hide that task */
        closeButtonEvent();
        /* On click of close icon, mark the tasks completed */
        markTaskCompleted();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();