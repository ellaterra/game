const toDoList=
[
{ name:'make dinner';
  dueDate="2022-10-02";}
  {name:'wash dishes'
    dueDate:"2022-10-02"
  }
] ;

renderToDoList();

function renderToDoList(){


let toDoListHTML='';

for(let i=0; i<toDoList.length;i++){
    const toDoObject=toDoList[i];
    const {name,dueDate}=toDoObject;


    const html=`
     <div>${name}</div>
     <div>${dueDate}</div>
     
    <button onclick=" 
    todoList.splice(${i},1);
    renderToDoList();
    " class="delete-todo-button">Delete</button>
    </p>`
    toDoList+=html;

}


document.querySelector ('.js-to-do-list').innerHTML=toDoList;
}

const dateInputElement= document.querySelector('.js-due-date-input')
const dueDate= inputElement.value;


function addToDo(){
    const inputElement= document.querySelector('.js-name-input');
    const name= inputElement.value;

    toDoList.push(
        {
        name,
        dueDate,
        });

    

    inputElement.value='';

    renderToDoList();
}