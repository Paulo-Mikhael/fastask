//#region 

function ColumnTasksRemoveHover(){
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(el => {
        if (el.classList.contains("selected"))
        {
            el.classList.remove("selected");
        }
    });
}
function ColumnTasksHover(){
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(el => {
        el.addEventListener('click', (evt) => {
            const itemSelected = document.querySelector('.selected');
            const target = evt.target;
    
            itemSelected.classList.remove('selected');
            target.classList.add('selected');
        });
    });
}
ColumnTasksHover();
//#endregion

//#region
function MainTasksHover()
{
    const mainTasks = document.querySelectorAll('.main-task');

    mainTasks.forEach(el => {
    el.addEventListener('click', (evt) => {
        const target = evt.target;
        if (!target.classList.contains("selected"))
        {
            MainTasksRemoveHover();
            target.classList.add('selected');
        }
        });
    });
}
function MainTasksRemoveHover()
{
    const mainTasks = document.querySelectorAll('.main-task');

    mainTasks.forEach(el => {
        if (el.classList.contains("selected"))
        {
            el.classList.remove('selected');
        }
    });
}
MainTasksHover();
//#endregion

//#region
const newTaskButton = document.querySelector("#new-task-button");
const newTaskImage = document.querySelector("#new-task-image");

newTaskButton.addEventListener("mouseenter", (evt) =>{
    newTaskImage.setAttribute("src", "src/images/adicionar-hover.png");
});
newTaskButton.addEventListener("mouseleave", (evt) =>{
    newTaskImage.setAttribute("src", "src/images/adicionar.png");
});
newTaskButton.addEventListener("click", (evt) =>{
    const newTaskInput = document.querySelector("#new-task-input");
    const tasksContent = document.querySelector("#main-tasks-content");

    if (newTaskInput.value != "")
    {
        newTaskImage.setAttribute("src", "src/images/adicionar-click.png");
    
        let task = newTaskInput.value;
        newTaskInput.value = "";
    
        const newTask = document.createElement("div");
        newTask.classList.add("main-task");
    
        const newCheckBox = document.createElement("input");
        newCheckBox.setAttribute("type", "checkbox");
        newCheckBox.setAttribute("name", "task-checkbox");
        newCheckBox.classList.add("task-checkbox");
    
        const newTaskText = document.createElement("h2");
        newTaskText.innerHTML = task;
    
        newTask.appendChild(newCheckBox);
        newTask.appendChild(newTaskText);
    
        tasksContent.appendChild(newTask);
        
        if (tasksContent.children.length > 0){
            tasksContent.insertBefore(newTask, tasksContent.firstChild);
        }

        MainTasksRemoveHover();
        MainTasksHover();
        newTask.classList.add("selected");
    }
    else
    {
        newTaskImage.setAttribute("src", "src/images/adicionar-click-red.png");
    }
});
//#endregion

//#region
const newTaskPlus = document.querySelector("#new-task-plus");
newTaskPlus.addEventListener("click", (evt) =>{
    const tasksContainer = document.querySelector("#tasks");
    
    if (tasksContainer.children.length <= 0){
        newTask();
    }else if (!tasksContainer.firstElementChild.classList.contains("in-edit")){
        newTask();
    }
    console.log(tasksContainer.firstElementChild);
});

function newTask(){
    const tasksContainer = document.querySelector("#tasks");

    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.classList.add("in-edit");

    const taskName = document.createElement("h4");
    taskName.innerHTML = "Nova tarefa";
    taskName.setAttribute("contenteditable", "true");
    taskName.setAttribute("maxlegth", "10");
    
    const taskNumber = document.createElement("h5");
    taskNumber.innerHTML = "0";

    newTask.appendChild(taskName);
    newTask.appendChild(taskNumber);

    tasksContainer.appendChild(newTask);

    if (tasksContainer.children.length > 0){
        tasksContainer.insertBefore(newTask, tasksContainer.firstChild);
    }

    ColumnTasksRemoveHover();
    ColumnTasksHover();

    taskName.focus();

    taskName.addEventListener("blur", onBlurHandler);
    taskName.addEventListener("keydown", onKeyDownHandler);
    
    function onBlurHandler(event) {
        if (taskName.innerHTML === "") {
            taskName.innerHTML = "Nova Tarefa";
        }
        newTask.classList.remove("in-edit");
        taskName.setAttribute("contenteditable", "false");
        newTask.classList.add("selected");
    }
    
    function onKeyDownHandler(event) {
        if (event.keyCode === 13) { // Verifica se a tecla pressionada é Enter
            onBlurHandler(); // Chama a mesma lógica do evento blur
        }
    }
}
//#endregion