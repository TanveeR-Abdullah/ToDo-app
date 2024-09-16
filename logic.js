const Toform = document.querySelector('form');
const ToInput = document.getElementById('todo-input');
const Toul = document.getElementById('todo-list');

let Todoall =gettodo();
updatetodolist();


Toform.addEventListener('submit',function(e){  
    e.preventDefault();
    addtodo();
   
})

function addtodo(){
    const Todotext = ToInput.value.trim();
    // alert(Todotext);
    if( Todotext.length > 0){
        const todoObject = {
            text: Todotext,
            completed: false
        }
        Todoall.push(todoObject);
        updatetodolist();
        savedata();
        ToInput.value =""; 
        
    }
}
function updatetodolist(){
    Toul.innerHTML = "";
    Todoall.forEach((Todo,Todoindex)=>{
        todoitem = creatToDoitem(Todo,Todoindex);
        Toul.append(todoitem);
    })

}
function creatToDoitem(Todo , Todoindex){
    const a = 'Todo'+Todoindex;
    const TodoLi = document.createElement("li");
    const todoText = Todo.text;
    TodoLi.className = "todo";
    TodoLi.innerHTML = `
                <input type="checkbox" id="${a}">
                    <label class="custom-checkbox" for="${a}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                    </label>
                    <label for="${a}" class="todo-text">
                    ${todoText}
                    </label>
                    <label  for="${a}"  >
                    <button class="delete">
                        <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                    </label>` 
    const deleteButton = TodoLi.querySelector(".delete");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(Todoindex);
    })
    const checkbox = TodoLi.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        Todoall[Todoindex].completed = checkbox.checked;
        savedata();
    })
    checkbox.checked = Todo.completed;
    return TodoLi;
}
function deleteTodoItem(Todoindex){
    Todoall = Todoall.filter((_, i)=> i !== Todoindex);
    savedata();
    updatetodolist();
}
function savedata(){
    const todosjson = JSON.stringify(Todoall)
    localStorage.setItem("todos",todosjson);
}
function gettodo(){
    const a = localStorage.getItem("todos") || "[]";
    return JSON.parse(a);
}
