function getFromLS() {
  const tasks = localStorage.getItem("tasks");
  const retrievedTasks = JSON.parse(tasks) || [];
  // console.log(retrievedTasks);
  return retrievedTasks;
}

function setToLS(allTasks) {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showTasks();
}

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

function showTasks() {
  const tasks = getFromLS();
  const fragment = document.createDocumentFragment();
  // console.log(tasks, "from show task");

  taskList.innerHTML = "";
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
       <!-- <span>${task.isCompleted == true ? "Complete" : "Incomplete"}</span> -->
    </div>
    `;

    // const checkbox = taskItem.querySelector(`#status-${task._id}`);
    // checkbox.addEventListener("change", (e) => {
    //   updateTask(task._id);
    // });
    fragment.appendChild(taskItem);
  });

  taskList.appendChild(fragment);
}

showTasks();
