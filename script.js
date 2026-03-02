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
  
}