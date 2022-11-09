let toDoList = [];
let addTask = function (item) {
  let newTask = document.createElement("div");
  newTask.setAttribute("class", "task");
  let myP = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let icon = document.createElement("li");
  icon.setAttribute("class", "fa-solid fa-square-check");

  let txt = document.createTextNode(item);
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can fa-2x"></i>`;

  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.addEventListener("click", function () {
    console.log(item);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(function (element) {
      return element != item;
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    newTask.remove();
  });

  myP.addEventListener("click", function () {
    if (myP.style.textDecoration === "line-through") {
      myP.style.textDecoration = "";
      myP.removeChild(icon);
    } else {
      myP.style.textDecoration = "line-through";
      myP.insertBefore(icon, myP.firstChild);
    }
  });

  myP.appendChild(txt);

  newTask.appendChild(myP);
  newTask.appendChild(deleteBtn);

  document.getElementById("tasks").appendChild(newTask);

  newTask.style =
    "background-color:white;border-radius:10px;display:flex; font-size:20px;justify-content:space-between;align-items:center;margin:7px 5px; cursor:pointer";
  deleteBtn.style =
    "border:none;border-radius:10px; padding:10px 15px;cursor:pointer;background-color:#b75927;color:white;margin:10px";
  icon.style = "margin-right:10px ;color:#b75927";
  myP.style = "margin-left:20px";
};

let getTasks = function (items) {
  for (let i = 0; i < items.length; i++) {
    addTask(items[i]);
    console.log(items[i]);
  }
};

function getLocalStorage() {
  if (window.localStorage.length !== 0) {
    toDoList = JSON.parse(localStorage.getItem("tasks"));
    getTasks(toDoList);
  }
}
getLocalStorage();

document.getElementById("ADD").addEventListener("click", function () {
  var task = document.getElementById("input").value;
  document.getElementById("input").value = "";
  if (task !== "") {
    if (window.localStorage.length !== 0) {
      toDoList = JSON.parse(localStorage.getItem("tasks"));
      if (toDoList.includes(task)) {
        alert("Already exists!");

        return;
      }
    }
    addTask(task);
    toDoList.push(task);
    window.localStorage.setItem("tasks", JSON.stringify(toDoList));
  }
});

function clearALL() {
  let parent = document.getElementById("tasks");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  window.localStorage.removeItem("tasks");
}
