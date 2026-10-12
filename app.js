let nextId = 3;
let task = [
    { id: 0, text: "Complete HTML assignment", done: false },
    { id: 1, text: "Learn JavaScript", done: false },
    { id: 2, text: "Build a responsive website", done: false }
];

let currentFilter = "all";
let searchText = "";

let tasklist = document.getElementById("task-list");
let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let searchInput = document.getElementById("search-input");
let filterBtns = document.querySelectorAll(".filter-btn");

function updateStats() {
    let doneCount = task.filter(function (t) { return t.done; }).length;
    document.getElementById("stat-total").textContent = task.length;
    document.getElementById("stat-done").textContent = doneCount;
    document.getElementById("stat-pending").textContent = task.length - doneCount;
}

function getVisibleTasks() {
    return task
        .filter(function (t) {
            if (currentFilter === "pending") return !t.done;
            if (currentFilter === "done") return t.done;
            return true;
        })
        .filter(function (t) {
            return t.text.toLowerCase().includes(searchText.toLowerCase());
        });
}

function renderTask() {
    tasklist.innerHTML = "";
    let visible = getVisibleTasks();

    if (visible.length === 0) {
        let empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = "No tasks to show.";
        tasklist.appendChild(empty);
    }

    visible.forEach(function (t) {
        let card = document.createElement("div");
        card.className = "task-card";
        card.classList.add("item-" + t.id);
        card.dataset.id = t.id;
        if (t.done) card.classList.add("done");

        let name = document.createElement("h3");
        name.className = "task-title";
        name.textContent = t.text;                       // textContent: safe for user input

        let badge = document.createElement("span");
        badge.className = t.done ? "badge completed" : "badge pending";
        badge.textContent = t.done ? "Completed" : "Pending";

        let actions = document.createElement("div");
        actions.className = "actions";

        let doneBtn = document.createElement("button");
        doneBtn.textContent = t.done ? "Undo" : "Mark as Done";
        doneBtn.addEventListener("click", function () {
            t.done = !t.done;
            renderTask();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            task = task.filter(function (x) { return x.id !== t.id; });
            renderTask();
        });

        actions.appendChild(doneBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(name);
        card.appendChild(badge);
        card.appendChild(actions);
        tasklist.appendChild(card);
    });

    updateStats();
}

function addTask() {
    let text = taskInput.value.trim();
    if (text === "") return;
    task.push({ id: nextId++, text: text, done: false });
    taskInput.value = "";
    renderTask();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
});

searchInput.addEventListener("input", function () {
    searchText = searchInput.value;
    renderTask();
});

filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        currentFilter = btn.dataset.filter;
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderTask();
    });
});

renderTask();