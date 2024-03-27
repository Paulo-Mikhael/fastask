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

                const mainTitle = document.querySelector(".main-title > h1");

                if (target.tagName == "H4" || target.tagName == "H5")
                {
                    const targetParent = target.parentElement;
                    const divParentH4 = document.querySelector("#" + targetParent.id + " > h4");
                    const targetParentTaskContainer = document.querySelector(".main-tasks-content." + targetParent.id);

                    ColumnTasksRemoveHover();

                    targetParent.classList.add('selected');
                    targetParentTaskContainer.classList.remove("hidden");

                    mainTitle.innerHTML = divParentH4.innerHTML;
                }
                else
                {
                    const divParentH4 = document.querySelector("#" + target.id + " > h4");
                    const targetTaskContainer = document.querySelector(".main-tasks-content." + target.id);

                    ColumnTasksRemoveHover();

                    target.classList.add('selected');
                    targetTaskContainer.classList.remove("hidden");
                    mainTitle.innerHTML = divParentH4.innerHTML;
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
            if (target.tagName == "H2" || target.tagName == "INPUT" || target.tagName == "I" || target.classList.contains("task-title"))
            {
                if (target.tagName == "I" || target.classList.contains("task-title"))
                {
                    targetParent = target.parentElement;
                    MainTasksRemoveHover();
                    targetParent.classList.add('selected');
                }
                else
                {
                    const targetParent = target.parentElement.parentElement;
                    MainTasksRemoveHover();
                    targetParent.classList.add('selected');
                }

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

        const mainTaskContainer = document.createElement("div");
        mainTaskContainer.classList.add("task-title");

        const taskTrash = document.createElement("i");
        taskTrash.classList.add("fa-solid");
        taskTrash.classList.add("fa-trash");
        
        const taskPencil = document.createElement("i");
        taskPencil.classList.add("fa-solid");
        taskPencil.classList.add("fa-pencil");
    
        mainTaskContainer.appendChild(newCheckBox);
        mainTaskContainer.appendChild(newTaskText);

        newTask.appendChild(mainTaskContainer);
        newTask.appendChild(taskPencil);
        newTask.appendChild(taskTrash);
    
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
        mainTitle.innerHTML = "Nova Tarefa...";
    }
    else if (el.id == "lists")
    {
        newTask.id = "list-" + nextListId;
        nextListId += 1;
        mainTitle.innerHTML = "Nova Lista...";
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

    taskName.addEventListener("keydown", onKeyDownHandler);
    taskName.addEventListener("blur", onBlurHandler);
    taskName.addEventListener("input", () =>{
        mainTitle.innerHTML = taskName.innerHTML;
    });
    
    function onBlurHandler(event) 
    {
        if (taskName.innerHTML === "") {
            if (el.id == "tasks")
            {
                taskName.innerHTML = "Nova Tarefa";
            }
            else if (el.id == "lists")
            {
                taskName.innerHTML = "Nova Lista";
            }
        }
        mainTitle.innerHTML = taskName.innerHTML;
        newTask.classList.remove("in-edit");
        taskName.setAttribute("contenteditable", "false");
        newTask.classList.add("selected");
    }
    
    function onKeyDownHandler(event) 
    {
        if (event.keyCode === 13) {
            onBlurHandler();
        }
    }

    hiddenMainTasksContent();

    const sectionContent = document.querySelector(".main-content");

    const newMainContent = document.createElement("div");
    newMainContent.classList.add("main-tasks-content");
    newMainContent.classList.add(newTask.id);

    sectionContent.appendChild(newMainContent);

    const height = parseInt(window.getComputedStyle(tasksContainer).height);
    if (height >= 150){
        tasksContainer.style.height = "160px";
    }
}
//#endregion

//#region
const mainTitle = document.querySelector(".main-title > h1");
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