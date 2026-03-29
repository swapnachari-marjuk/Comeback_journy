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

  if (e.target.id.includes("delete-")) {
    const itemId = e.target.id.replace("delete-", "");
    if (confirm("Are you sure to delete this task?")) {
      // console.log(itemId);
      deleteTask(itemId);
    }
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
              <div  class="flex justify-between">
                  <div>
                    <input id="status-${task._id}" ${checkedAttribute} type="checkbox"/>
                    <label for="status-${task._id}" class="${task.isCompleted ? "line-through" : ""}">${task.taskName}</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm">${task.isCompleted ? "Complete" : "Incomplete"}</span>
                    <button id="delete-${task._id}" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition">
                        X
                    </button>
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
