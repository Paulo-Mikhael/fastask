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
            const target = evt.target;
    
            if (target.id !== "tasks")
            {
                hiddenMainTasksContent();

                if (target.tagName == "H4" || target.tagName == "H5")
                {
                    const targetParent = target.parentElement;
                    const targetParentTaskContainer = document.querySelector(".main-tasks-content." + targetParent.id);
                    ColumnTasksRemoveHover();
                    targetParent.classList.add('selected');
                    targetParentTaskContainer.classList.remove("hidden");
                }
                else
                {
                    const targetTaskContainer = document.querySelector(".main-tasks-content." + target.id);
                    ColumnTasksRemoveHover();
                    target.classList.add('selected');
                    targetTaskContainer.classList.remove("hidden");
                }
            }
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
            if (target.tagName == "H2" || target.tagName == "INPUT")
            {
                const targetParent = target.parentElement;
                MainTasksRemoveHover();
                targetParent.classList.add('selected');
            }
            else
            {
                MainTasksRemoveHover();
                target.classList.add('selected');
            }
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
    const taskSelected = document.querySelector(".task.selected");

    newMainTask(taskSelected.id);
});

function newMainTask(taskId){
    const newTaskInput = document.querySelector("#new-task-input");

    const tasksContent = document.querySelector(".main-tasks-content." + taskId);

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
}
//#endregion

//#region
const newTaskPlus = document.querySelector("#new-task-plus");
newTaskPlus.addEventListener("click", (evt) =>{
    const tasksContainer = document.querySelector("#tasks");
    
    if (tasksContainer.children.length <= 0){
        newTask(document.querySelector("#tasks"));
    }else if (!tasksContainer.firstElementChild.classList.contains("in-edit")){
        newTask(document.querySelector("#tasks"));
    }
    console.log(tasksContainer.firstElementChild);
});

const newListPlus = document.querySelector("#new-list-plus");
newListPlus.addEventListener("click", (evt) =>{
    const listContainer = document.querySelector("#lists");
    
    if (listContainer.children.length <= 0){
        newTask(document.querySelector("#lists"));
    }else if (!listContainer.firstElementChild.classList.contains("in-edit")){
        newTask(document.querySelector("#lists"));
    }
    console.log(listContainer.firstElementChild);
});
//#endregion

//#region 
let nextTaskId = 3;
let nextListId = 4;

function newTask(el){
    const tasksContainer = el;

    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.classList.add("in-edit");

    if (el.id == "tasks")
    {
        newTask.id = "task-" + nextTaskId;
        nextTaskId += 1;
    }
    else if (el.id == "lists")
    {
        newTask.id = "list-" + nextListId;
        nextListId += 1;
    }

    const taskName = document.createElement("h4");
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
    
    function onBlurHandler(event) 
    {
        if (taskName.innerHTML === "") {
            taskName.innerHTML = "Nova Tarefa";
        }
        newTask.classList.remove("in-edit");
        taskName.setAttribute("contenteditable", "false");
        newTask.classList.add("selected");

        hiddenMainTasksContent();

        const sectionContent = document.querySelector(".main-content");
    
        const newMainContent = document.createElement("div");
        newMainContent.classList.add("main-tasks-content");
        newMainContent.classList.add(newTask.id);
    
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("main-task");
    
        const taskCheckbox = document.createElement("input");
        taskCheckbox.classList.add("task-checkbox");
        taskCheckbox.setAttribute("type", "checkbox");
    
        const textTask = document.createElement("h2");
        textTask.innerHTML = "Tarefa de exemplo";

        taskContainer.appendChild(taskCheckbox);
        taskContainer.appendChild(textTask);
        newMainContent.appendChild(taskContainer);
    
        sectionContent.appendChild(newMainContent);
    }
    
    function onKeyDownHandler(event) 
    {
        if (event.keyCode === 13) {
            onBlurHandler();
        }
    }

    const height = parseInt(window.getComputedStyle(tasksContainer).height);
    if (height >= 150){
        tasksContainer.style.height = "160px";
    }
}
//#endregion

//#region
const mainInput = document.querySelector("#new-task-input");
function verificaInput(){
        mainInput.addEventListener("keydown", () => {
        if (event.key === "Enter")
        {
            if (mainInput.value === ""){
                mainInput.style.animation = "alert 0.3s alternate";
            }
            else
            {
                const taskSelected = document.querySelector(".task.selected");

                newMainTask(taskSelected.id);
            }
        }
    });
}
mainInput.addEventListener("input", function(event) {
    mainInput.style.animation = "";
});

verificaInput()
//#endregion

//#region 
function hiddenMainTasksContent()
{
    const mainTasksContent = document.querySelectorAll(".main-tasks-content");
    
    mainTasksContent.forEach(el => {
        el.classList.add("hidden");
    });
}