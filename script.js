const overlayScreen = document.querySelector("#overlayScreen");
const openTaskModal = document.querySelector("#openTaskModal");
const closeTaskModal = document.querySelector("#closeTaskModal");
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const taskPriority = document.querySelector("#taskPriority");
const addnewTask = document.querySelector("#addnewTask");
const tasksDivSection = document.querySelector("#tasksDivSection");

let tasksList = [];
let tasksID=0

const priorityTasks=document.querySelector('#priorityTasks')
const activeTasks=document.querySelector('#activeTasks')
const completedTasks=document.querySelector('#completedTasks')
const totalTasks=document.querySelector('#totalTasks')


// opening add new task modal 
const handleOverlayScreen = () => {
    overlayScreen.classList.toggle("hidden");
    taskTitle.value=''
    taskDescription.value=''
    taskPriority.checked=false
};

openTaskModal.addEventListener("click", handleOverlayScreen);
closeTaskModal.addEventListener("click", handleOverlayScreen);

// updating task monitor
const updateTaskMonitor=()=>{
  totalTasks.textContent = tasksList.length;
  completedTasks.textContent = tasksList.filter(task=>task.completed).length
  priorityTasks.textContent = tasksList.filter(task=>task.priority && !task.completed).length
  activeTasks.textContent =tasksList.filter(task=>!task.completed).length
}

// creating new task
const createNewTask = () => {
    
    tasksID++

    const task = {
        id:tasksID,
        title: taskTitle.value,
        description: taskDescription.value,
        priority: taskPriority.checked,
        completed:false
    };
    
    tasksList.push(task)
    
    // clearing inputs
    taskTitle.value=''
    taskDescription.value=''
    taskPriority.checked=false

    overlayScreen.classList.add("hidden");
    
    renderTask()
  };
  
  addnewTask.addEventListener('click',createNewTask)

// rendering tasksList in tasksDivSection
const renderTask=(list=tasksList)=>{

  tasksDivSection.innerHTML=""
  list.forEach(task=>{
    const mainDiv = document.createElement("div");

    mainDiv.dataset.id=task.id
    
    mainDiv.classList.add(
      "task",
      "relative",
      "flex",
      "space-x-2",
      "items-start",
      "p-5",
      "border",
      "border-gray-300",
      "bg-[#FFFFFF]",
      "rounded-lg",
      "hover:shadow-lg",
    );
    
    mainDiv.innerHTML = `
    <input type="checkbox" ${task.completed?'checked':''} class="mt-1.5 task-completed">
    <div class="space-y-1">
    <span class='${task.completed?"line-through text-gray-400 font-bold":"font-bold"}'>${task.title}</span>
    <div class='${task.completed?"line-through text-gray-400 font-bold" :"text-gray-500 font-bold"}'>${task.description}</div>
    ${
      task.priority ?  
        `<div class=" flex text-sm w-full text-red-500 rounded-lg bg-gray-200 p-1 items-center space-x-2">
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-3">
        <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
        </svg>
        </span>
        <span>Priority Task</span> 
        </div>` : ''
    }
    </div>
    <div class=" absolute grid grid-cols-2 w-fit right-0 me-2">
    <span class="edit-btn h-[30px] w-[30px] rounded-lg hover:bg-gray-200 p-2 items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
    </span>
    <span class="delete-btn h-[30px] w-[30px] rounded-lg text-red-500 hover:bg-gray-200 p-2 items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
    </svg>
    </span>
    </div>
    `;
    
    tasksDivSection.appendChild(mainDiv)
    
    updateTaskMonitor()
  
  })
}

// striking task after checkbox is checked
tasksDivSection.addEventListener('change', (event) => {
  const checkbox = event.target.closest('.task-completed');
  if (!checkbox) return;
  const taskDiv = checkbox.closest('.task');
  const id = Number(taskDiv.dataset.id);

  const task = tasksList.find(t => t.id === id);
  task.completed = checkbox.checked;

  updateTaskMonitor()

  renderTask();

});

// deleting task
tasksDivSection.addEventListener('click',(event)=>{
  const deleteBtn=event.target.closest('.delete-btn')
  const taskDiv=deleteBtn.closest('.task')
  const id = Number(taskDiv.dataset.id)

  const task=tasksList.find(t=>t.id===id)
  tasksList.pop(task)
  
  updateTaskMonitor()
  
  renderTask()
});

const taskUpdateModel=document.querySelector('#taskUpdateModel')
const updatingTaskTitle=document.querySelector('#updatingTaskTitle')
const updatingTaskDescription=document.querySelector('#updatingTaskDescription')
const updatingTaskPriority=document.querySelector('#updatingTaskPriority')
const updatingTaskBtn=document.querySelector('#updatingTask')
const closeTaskUpdateModal= document.querySelector('#closeTaskUpdateModal')

closeTaskUpdateModal.addEventListener=('click',()=>{taskUpdateModel.classList.add('hidden')})

// updating task
const updateTask=(id)=>{
  const currentTask=tasksList.find(t=>t.id===id)
  if (!currentTask) return

  taskUpdateModel.classList.remove('hidden')
  
  updatingTaskTitle.value=currentTask.title
  updatingTaskDescription.value=currentTask.description
  updatingTaskPriority.checked=currentTask.priority

  const saveUpdatedDetails=()=>{
    currentTask.title=updatingTaskTitle.value
    currentTask.description=updatingTaskDescription.value
    currentTask.priority=updatingTaskPriority.checked
    taskUpdateModel.classList.add('hidden')
    renderTask()
  }
  updatingTaskBtn.addEventListener('click',saveUpdatedDetails)
}

tasksDivSection.addEventListener('click',(event)=>{
  const editBtn=event.target.closest('.edit-btn')
  if(!editBtn) return
  const taskDiv=editBtn.closest('.task')
  const id=Number(taskDiv.dataset.id)
  updateTask(id)
  updateTaskMonitor()
  renderTask()
})

let taskType=document.querySelector('#taskType')
const filterAllTask=document.querySelector('#filterAllTask')
const filterActiveTask=document.querySelector('#filterActiveTask')
const filterPriorityTask=document.querySelector('#filterPriorityTask')
const filterCompletedTask=document.querySelector('#filterCompletedTask')

const renderFilterTask=(list)=>{
  
}

filterAllTask.addEventListener('click',()=>{
  taskType.textContent="All Tasks"
  renderTask()
})

filterActiveTask.addEventListener('click',()=>{
  const list =tasksList.filter(task=>(!task.completed))
  taskType.textContent="Active Tasks"
  renderTask(list)
})

filterCompletedTask.addEventListener('click',()=>{
  const list = tasksList.filter(t=>t.completed)
  taskType.textContent="Completed Tasks"
  renderTask(list)
})

filterPriorityTask.addEventListener('click',()=>{
  const list = tasksList.filter(t=>t.priority)
  taskType.textContent="Priority Tasks"
  renderTask(list)
})

const searchInput = document.querySelector('#searchInput')
searchInput.addEventListener('input',()=>{
  const query = searchInput.value.trim().toLowerCase()
  const filteredTaskList=tasksList.filter(task=>
    task.title.toLowerCase().includes(query) || 
    task.description.toLowerCase().includes(query));
    renderTask(filteredTaskList)
})