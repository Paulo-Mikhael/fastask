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
                if (target.parentElement.classList.contains("task-title"))
                {
                    const targetParent = target.parentElement.parentElement;
                    MainTasksRemoveHover();
                    targetParent.classList.add('selected');
                }
                else if (target.tagName == "I" || target.classList.contains("task-title") || target.tagName == "P")
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

        const mainTaskContainer = document.createElement("div");
        mainTaskContainer.classList.add("task-title");

        const taskTrash = document.createElement("i");
        taskTrash.classList.add("fa-solid");
        taskTrash.classList.add("fa-trash");
        
        const taskPencil = document.createElement("i");
        taskPencil.classList.add("fa-solid");
        taskPencil.classList.add("fa-pencil");

        const taskDate = document.createElement("p");
        var dataAtual = new Date();
        var ano = dataAtual.getFullYear();
        var mes = dataAtual.getMonth() + 1;
        var dia = dataAtual.getDate();
        var dataFormatada = (dia < 10 ? '0' : '') + dia + "/" + (mes < 10 ? '0' : '') + mes + "/" + ano;
        taskDate.innerHTML = dataFormatada;
    
        mainTaskContainer.appendChild(newCheckBox);
        mainTaskContainer.appendChild(newTaskText);
        mainTaskContainer.appendChild(taskDate);

        newTask.appendChild(mainTaskContainer);
        newTask.appendChild(taskPencil);
        newTask.appendChild(taskTrash);
    
        tasksContent.appendChild(newTask);
        
        if (tasksContent.children.length > 0){
            tasksContent.insertBefore(newTask, tasksContent.firstChild);
        }

        const taskSelectedNumber = document.querySelector(".task.selected > h5");
        taskSelectedNumber.innerHTML = tasksContent.children.length;

        MainTasksRemoveHover();
        MainTasksHover();
        newTask.classList.add("selected");
    }
    else
    {
        newTaskImage.setAttribute("src", "src/images/adicionar-click-red.png");
    }

    completedTasks();
    RemoverMainTasks();
    RenomearMainTask();
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
    taskName.addEventListener("input", () => {
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
//#endregion

//#region
function RenomearMainTask(){
    const faPencil = document.querySelectorAll(".fa-pencil");

    faPencil.forEach(el => {
        el.addEventListener("click", () => {
            const closestContainer = el.closest(".main-task");
            const text = closestContainer.firstChild.children[1];

            const initialText = text.innerHTML;

            text.setAttribute("contenteditable", "true");
            closestContainer.classList.add("in-edit");
            text.focus();

            text.addEventListener("blur", textBlur);
            text.addEventListener("keypress", textEnter);

            function textBlur() 
            {
                if (text.innerHTML == "")
                {
                    text.innerHTML = initialText;
                }

                text.setAttribute("contenteditable", "false");
                closestContainer.classList.remove("in-edit");
            }

            function textEnter(event) 
            {
                if (event.keyCode === 13) {
                    textBlur();
                }
            }
        });
    });
}
RenomearMainTask();

function RemoverMainTasks()
{
    const faTrash = document.querySelectorAll(".fa-trash");
    faTrash.forEach(el => {
        el.addEventListener("click", () => {
            const taskSelectedNumber = document.querySelector(".task.selected > h5");
            const mainTaskContainer = el.parentElement.parentElement;
            const faTrashParent = el.parentElement;
            const trashContainer = document.querySelector(".main-tasks-content.trash");
            const trashNumber = document.querySelector(".completed-trash > #trash > h5");

            faTrashParent.removeChild(el);
            const faPencil = faTrashParent.lastChild;
            console.log(faPencil); 
            faTrashParent.removeChild(faPencil);

            const taskName = document.createElement("p");
            taskName.classList.add("trashP");
            taskName.innerHTML = mainTitle.innerHTML;

            mainTaskContainer.removeChild(faTrashParent);
            faTrashParent.appendChild(taskName);
            trashContainer.appendChild(faTrashParent);

            taskSelectedNumber.innerHTML = mainTaskContainer.children.length;
            trashNumber.innerHTML = trashContainer.children.length;
        });
    });
}
RemoverMainTasks();
//#endregion

//#region 
let nextCopyId = 1;
function completedTasks()
{
    const checkbox = document.querySelectorAll(".task-checkbox");
    checkbox.forEach(el => {
        el.addEventListener('change', function() {
            const mainTaskContainer = el.parentElement.parentElement;
            const completedContainer = document.querySelector(".main-tasks-content.completed");
            const completedNumber = document.querySelector(".completed-trash > #completed > h5");
            const mainTaskCopy = mainTaskContainer.cloneNode(true);
            
            if (el.checked)
            {
                mainTaskContainer.setAttribute("id", nextCopyId);
                mainTaskCopy.setAttribute("id", "copy-id-" + nextCopyId);
                nextCopyId++;
                completedContainer.appendChild(mainTaskCopy);
                completedNumber.innerHTML = completedContainer.children.length;
            }
            else
            {
                const deleteCopy = document.querySelector(".main-tasks-content.completed > #copy-id-" + mainTaskContainer.id);

                completedContainer.removeChild(deleteCopy);
                completedNumber.innerHTML = completedContainer.children.length;
            }
        });
    });
}
completedTasks();
//#endregion

//#region 
const allP = document.querySelectorAll("p");
var dataAtual = new Date();
var ano = dataAtual.getFullYear();
var mes = dataAtual.getMonth() + 1;
var dia = dataAtual.getDate();
var dataFormatada = (dia < 10 ? '0' : '') + dia + "/" + (mes < 10 ? '0' : '') + mes + "/" + ano;
allP.forEach(el => {
    el.innerHTML = dataFormatada;
});
//#endregion