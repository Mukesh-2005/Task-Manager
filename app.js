let task = [{text : "Complete HTML assignment", done: false},
    {text: "Learn JavaScript", done:false},
    {text: "Build a responsive website", done:false}
];

let tasklist = document.getElementById("task-list");





function renderTask() {
    tasklist.innerHTML = "";
    for (let i = 0; i < task.length; i++) {
        let card = document.createElement("div");
        card.className = "task-card";

        let name = document.createElement("h3");
        name.textContent = task[i].text;

        let status = document.createElement("p");
        if (task[i].done) {
            status.textContent = "Status: Completed";
        } else {
            status.textContent = "Status: Pending";
        }

        let doneBtn = document.createElement("button");
        doneBtn.textContent = "Mark as Done"; 
        doneBtn.addEventListener("click", function() {
            task[i].done = true;
            renderTask();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            task.splice(i, 1);
            renderTask();
        });

        card.appendChild(name);
        card.appendChild(status);
        card.appendChild(doneBtn);
        card.appendChild(deleteBtn);

        tasklist.appendChild(card);
    }   }
        let taskInput = document.getElementById("task-input");
        let addBtn = document.getElementById("add-btn");

        addBtn.addEventListener("click", function() {
              if (taskInput.value !== "") {
                task.push({ text: taskInput.value, done: false });
                taskInput.value = "";
                renderTask();
  }
});

    renderTask();