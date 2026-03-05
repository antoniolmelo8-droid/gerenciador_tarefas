const apiUrl = "http://localhost:3000/tasks";

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", async(e) => {
   e.preventDefault();
   
   const title = document.getElementById("title").value;
   const description = document.getElementById("description").value;

  try{
    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({ title, description })
    });

    if(!res.ok) throw new Error("Erro ao adicionar tarefa")

        const task = await res.json();
        form.reset();
        addTaskToUl(task);
        } catch(err) {
         alert("erro ao salvar tarefas:"+ err.message);
        }
});

function addTaskToUl(task) {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";
  li.innerHTML = `
    <span>${task.title} - ${task.description}</span>
    <div>
    <button class="li-button" onclick="togglecomplete(${task.completed})">
    ✅
    </button>
    <button class="li-button" onclick="deleteTask(${task.id})">
    🗑️
    </button>
    </div>
  `;
  taskList.appendChild(li);
}

async function loadtasks() {
    try {

     const res = await fetch(apiUrl);
     if(!res.ok) throw new Error("Erro ao carregar tarefas");
     const tasks = await res.json();
     taskList.innerHTML = "";
     tasks.forEach(addTaskToUl)
    } catch (err) {
        alert("Erro ao carregar tarefas: " + err.message);
    }
}



async function togglecomplete(id, completed) {
try {
  await fetch(`${apiUrl}/${id}`, {
    method: "PUt",
    headers:{ "content-Type": "application/json" },
    body: JSON.stringify({completed: !completed})
  });

  loadtasks();

} catch (err) {
  alert("Erro ao atualizar tarefas:" + err.message);
 }
}

async function deleteTask(id) {
  try{
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    loadtasks();

  } catch (error) {
    alert("Error ao excluir a tarefa" + err.message)

  }
}