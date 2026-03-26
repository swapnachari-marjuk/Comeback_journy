function getFromLS() {
  const tasks = localStorage.getItem("tasks");
  const retrievedTasks = JSON.parse(tasks) || [];
  console.log(retrievedTasks);
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
    _id: crypto.randomUUID(),
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

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const checkedAttribute = task.taskStatus === "complete" ? "checked" : "";
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
    <div  class="flex justify-between">
        <div>
        <input id="status-${task._id}" ${checkedAttribute} type="checkbox"/>
        <label for="status-${task._id}">${task.taskName}</label>
        </div>
        <span>${task.taskStatus}</span>
    </div>
    `;

    taskList.appendChild(taskItem);
  });
}

showTasks();
