var textInput = document.getElementById("task-input");
var taskList = document.getElementById("list");
var addTaskBtn = document.getElementById("add-task-btn");
var clearTasksBtn = document.getElementById("clear-tasks-btn");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addTask() {
  if (textInput.value.trim() === "") {
    return;
  }

  // buat id unik berdasarkan waktu atau panjang localStorage
  const key = "task-" + Date.now();
  localStorage.setItem(key, textInput.value);

  console.log("Task added");

  var card = `
    <div id="tugas-list">
      <div class="container-todo">
        <h1 class="task-done">Task Done: </h1>
        <input type="checkbox" class="cb" onclick="check(this)"/>
        <h2 id="name-task">${textInput.value.charAt(0).toUpperCase() + textInput.value.slice(1)}</h2>
        <button class="btn" onclick="removeTask(this.parentElement.parentElement, '${key}')">Hapus</button>
      </div>
    </div>
  `;

  taskList.innerHTML += card;

  addTaskBtn.disabled = true;
  textInput.value = "";
}

function removeTask(taskElement, key) {
  taskElement.remove();
  localStorage.removeItem(key);
  console.log("Task removed");
  addTaskBtn.disabled = false;
  textInput.value = "";
  textInput.focus();
}


textInput.addEventListener("input", function() {
  addTaskBtn.disabled = textInput.value.trim() === "";

});

textInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // tambahkan ini agar tidak terduplikat
    addTask();
  }
});

addTaskBtn.addEventListener("click", addTask);

clearTasksBtn.addEventListener("click", function() {
  // Hapus hanya key yang diawali "task-"
  Object.keys(localStorage).forEach(function(key) {
    if (key.startsWith("task-")) {
      localStorage.removeItem(key);
    }
  });

  // Kosongkan tampilan
  taskList.innerHTML = "";

  console.log("Semua task dihapus.");
  addTaskBtn.disabled = false;
  textInput.value = "";
  textInput.focus();
});

window.addEventListener("DOMContentLoaded", function() {
  Object.keys(localStorage).forEach(function(key) {
    if (key.startsWith("task-")) {
      var taskValue = localStorage.getItem(key);

      var card = `
                <div id="tugas-list">
                  <div class="container-todo">
                    <h1 class="task-done">Task Done: </h1>
                    <input type="checkbox" class="cb" onclick="check(this)"/>
                    <h2 id="name-task">${taskValue.charAt(0).toUpperCase() + taskValue.slice(1)}</h2>
                    <button class="btn" onclick="removeTask(this.parentElement.parentElement, '${key}')">Hapus</button>
                  </div>
                </div>
            `;

      taskList.innerHTML += card;
    }
  });
});

function check(checkboxElement) {
  const taskTitle = checkboxElement.nextElementSibling; // <h2> setelah checkbox
  if (checkboxElement.checked) {
    taskTitle.style.textDecoration = "line-through";
    taskTitle.style.color = "green";
  } else {
    taskTitle.style.textDecoration = "none";
    taskTitle.style.color = "black";
  }
}