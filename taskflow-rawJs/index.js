function getFromLS() {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Data corruption detected:", error);
    return [];
  }
}

function setToLS(allTasks) {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showFilteredTasks();
  showTaskCount();
}

document.getElementById("addBtn").addEventListener("click", getTaskInput);
function getTaskInput() {
  const taskInput = document.getElementById("taskInput");
  const task = {
    _id: crypto.randomUUID(),
    taskName: taskInput.value.trim(),
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };

  if (task.taskName) {
    const tasks = getFromLS();
    const allTasks = [...tasks, task];
    // console.log(allTasks, "from get task input");
    setToLS(allTasks);
    taskInput.value = "";
  } else {
    alert("pls, input a valid name");
  }
}

function updateTask(taskId) {
  const tasks = getFromLS();
  const updatedTasks = tasks.map((task) => {
    if (task._id == taskId) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
  // console.log(updatedTasks, "from update func");
  setToLS(updatedTasks);
}

function deleteTask(taskId) {
  const tasks = getFromLS();
  const remainingTasks = tasks.filter((task) => task._id !== taskId);
  setToLS(remainingTasks);
}

document
  .getElementById("clearCompleted")
  .addEventListener("click", deleteAllCompleted);
function deleteAllCompleted() {
  if (confirm("Are you sure to delete all completed tasks?")) {
    const allTasks = getFromLS();
    const remainingTasks = allTasks.filter((task) => !task.isCompleted);
    setToLS(remainingTasks);
  }
}

const taskList = document.getElementById("taskList");
taskList.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    const fullId = e.target.id;
    const taskId = fullId.replace("status-", "");
    // console.log(taskId);
    updateTask(taskId);
  }
  // console.log(e.target.id);

  const deleteBtn = e.target.closest('button[id^="delete-"]');
  if (deleteBtn) {
    const itemId = deleteBtn.id.replace("delete-", "");
    if (confirm("Are you sure to delete this task?")) {
      deleteTask(itemId);
    }
    return;
  }
});

function showTasks(tasks) {
  const fragment = document.createDocumentFragment();
  const noDataDiv = document.getElementById("no-data");
  // console.log(tasks, "from show task");

  taskList.innerHTML = "";
  if (!tasks.length) {
    noDataDiv.classList.remove("hidden");
  } else {
    tasks.forEach((task) => {
      const checkedAttribute = task.isCompleted === true ? "checked" : "";
      const taskItem = document.createElement("li");

      taskItem.innerHTML = `
      <div class="flex items-center justify-between p-3 mb-2 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3">
          <input 
            id="status-${task._id}" ${checkedAttribute} 
            type="checkbox" 
            class="w-4 h-4 text-blue-600 rounded cursor-pointer focus:ring-blue-500"
            />

          <label 
            for="status-${task._id}" 
            class="text-sm font-medium cursor-pointer ${task.isCompleted ? "line-through text-gray-400" : "text-gray-700"}">
            ${task.taskName}
          </label>
        </div>

        <div class="flex items-center gap-3">
          <span 
            class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${task.isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}"
          >
            ${task.isCompleted ? "Done" : "Pending"}
          </span>

          <div class="flex items-center gap-1">
            <button 
              id="edit-${task._id}" 
              title="Edit Task" 
              class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                <path d="m15 5 4 4"/>
              </svg>
            </button>
            
            <button 
              id="delete-${task._id}" 
              title="Delete Task" 
              class="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
      fragment.appendChild(taskItem);
    });
    taskList.appendChild(fragment);
    noDataDiv.classList.add("hidden");
  }
}

let currentFilter = "all"; //global variable for filtering class
function showFilteredTasks() {
  const allTasks = getFromLS();
  let tasksToDisplay = [];

  // data filtering
  if (currentFilter === "all") {
    tasksToDisplay = allTasks;
  } else if (currentFilter === "complete") {
    tasksToDisplay = allTasks.filter((task) => task.isCompleted);
  } else if (currentFilter === "incomplete") {
    tasksToDisplay = allTasks.filter((task) => !task.isCompleted);
  }

  // calling active btn function
  updateFilterButtonsUI();
  // calling render function
  showTasks(tasksToDisplay);
}

showFilteredTasks();

// btn design update
function updateFilterButtonsUI() {
  const buttons = document.querySelectorAll("#filterContainer button");
  buttons.forEach((btn) => {
    if (btn.id === `btn-${currentFilter}`) {
      btn.classList.add("btn-active");
      btn.classList.remove("btn-deactivate");
    } else {
      btn.classList.remove("btn-active");
      btn.classList.add("btn-deactivate");
    }
  });
}

document.getElementById("btn-all").addEventListener("click", showAllTasks);
function showAllTasks() {
  currentFilter = "all";
  showFilteredTasks();
}

document
  .getElementById("btn-incomplete")
  .addEventListener("click", showIncomplete);
function showIncomplete() {
  currentFilter = "incomplete";
  showFilteredTasks();
}

document.getElementById("btn-complete").addEventListener("click", showComplete);
function showComplete() {
  currentFilter = "complete";
  showFilteredTasks();
}

function showTaskCount() {
  const allTasks = getFromLS();
  const incompleteTasks = allTasks.filter((task) => !task.isCompleted);
  console.log(incompleteTasks);
  const taskCount = document.getElementById("taskCount");
  taskCount.innerText = `${incompleteTasks?.length} tasks left`;
}

showTaskCount();
