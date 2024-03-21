//#region 
const tasks = document.querySelectorAll('.task');

tasks.forEach(el => {
    el.addEventListener('mouseenter', (evt) => {
        const target = evt.target;
        target.style.backgroundColor = 'var(--main-task-selected)'
    })
});

tasks.forEach(el => {
    el.addEventListener('mouseleave', (evt) => {
        const target = evt.target;
        target.style.backgroundColor = ''
    });
});

tasks.forEach(el => {
    el.addEventListener('click', (evt) => {
        const itemSelected = document.querySelector('.selected');
        const target = evt.target;

        itemSelected.classList.remove('selected');
        target.classList.add('selected');
    });
});
//#endregion

//#region
function MainTasksHover()
{
    const mainTasks = document.querySelectorAll('.main-task');

    mainTasks.forEach(el => {
    el.addEventListener('click', (evt) => {
        const target = evt.target;
        if (target.classList.contains("task-hover"))
        {
            const itemSelected = document.querySelector('.main-task.selected');

            target.classList.add('selected');
            itemSelected.classList.remove('selected');
        }
        });
    });
}
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
    }
    else
    {
        newTaskImage.setAttribute("src", "src/images/adicionar-click-red.png");
    }
});
//#endregion