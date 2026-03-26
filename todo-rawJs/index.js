function getFromLS() {
  const tasks = localStorage.getItem("tasks");
  const retrievedTasks = JSON.parse(tasks) || [];
  return retrievedTasks;
}

function setToLS(newTask) {
  const tasks = getFromLS();
  const allTasks = [...tasks, newTask];
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showTasks();
}

function getTask() {
  const taskInput = document.getElementById("taskInput").value;
  const task = {
    taskName: taskInput,
    createdAt: new Date().toISOString(),
    taskStatus: "incomplete",
  };

  if (task.taskName) {
    setToLS(task);
  } else {
    console.log("pls, input a valid name");
  }
}

function showTasks() {
  const tasks = getFromLS();
  const taskList = document.getElementById("taskList");

  tasks.map((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
    <div class="flex justify-between">
        <div>
        <input type="checkbox"/>
        <span>${task.taskName}</span>
        </div>
        <span>${task.taskStatus}</span>
    </div>
    `;

    taskList.appendChild(taskItem);
  });
}

showTasks();
