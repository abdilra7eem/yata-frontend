import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function CreateTodo(props){
  const {handleEdit, setEditable, beingEdited} = props;
  if (beingEdited == 0) {
    return (
      <div id='newTodo'>
        <form onSubmit={e=>handleEdit(e, e.target)}><input type="text" onChange={e=>setEditable(e.target.value)} defaultValue=""></input></form>
      </div>
    );
  } else {
    return <input type="text" disabled />
  }
}

function Todo(props){
  let {isdone, todo, id} = props.item;
  let {todoEdit, isDoneToggler, editable, handleEdit, setEditable, beingEdited, setBeingEdited} = props;

  if (beingEdited == id) {
    return (
      <div className="todo" data-todoid={id}>
        <form onSubmit={e=>handleEdit(e, e.target)}><input type="text" onChange={e=>setEditable(e.target.value)} defaultValue={todo}></input></form>
      </div>
   );
  }else {
    return (
      <div className="todo" data-todoid={id}>
        <input type="checkbox" onChange={(e)=>isDoneToggler(e, e.target)} checked={!!isdone}></input>
        <p onDoubleClick={(e)=>setBeingEdited(e.target.parentElement.dataset.todoid)}>{todo}</p>
      </div>
   );
  }
}

function TodoList(props){
  return (
      props.todos.map((item, index) => (
      <Todo item={item} key={index} 
        editing={props.editing} isDoneToggler={props.isDoneToggler} todoEdit={props.todoEdit} editable={props.editable} handleEdit={props.handleEdit} setEditable={props.setEditable} beingEdited={props.beingEdited} setBeingEdited={props.setBeingEdited}/>
      ))
  );
}

function App() {

  const [todos, setTodos] = useState([]); // todo list items
  const [loaded, setLoaded] = useState(false); // used to differenciate between 'not-yet-loaded' and 'empty-todo' state.
  const [editing, setEditing] = useState(false);
  const [editable, setEditable] = useState(""); // Text of the todo item being edited
  const [beingEdited, setBeingEdited] = useState(0); // id of the todo being edited. 0 for new todo

  const isDoneToggler = (e, target)=>{
    e.preventDefault();
    let id = target.parentElement.dataset.todoid;
    var newTodo = {}
    
    todos.forEach(item=>{
      if (item.id == id) {
        item.isdone = target.checked;
        newTodo = item;
      }
    })
    
    todoEdit(newTodo);

  }

  const handleEdit = (e, target) => {
    e.preventDefault();
    let isdone = false;
    if (target.parentElement.id !== "newTodo"){
      todos.forEach(item=>{
        let isdone = (item.id === beingEdited)? item.isdone : false;
      });
    }
    let newTodo = {
          id: beingEdited,
          todo: editable,
          isdone: isdone
        }
    todoEdit(newTodo);
  }
  
  const todoEdit = (newTodo)=>{
    fetch('http://localhost:4000/setTodo', {
      method: 'POST',
      mode:'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(newTodo)
    })
    .then(res => res.text())
    .then(texty => {
      if (texty === "updated") {
        let newTodos = todos.map(item=> (item.id == newTodo.id) ? newTodo: item)
        console.log(newTodos)
        setBeingEdited(0);
        setTodos(newTodos);
      } else if (texty==="Error"){
        console.log("The server API returned an error")
      }else{
        newTodo.id = texty;
        console.log(newTodo);
        setTodos([...todos,newTodo]);
      }
      setEditable("");
      // document.getElementById("newTodo").firstChild.firstChild.innerHTML("");
    })
    .catch(err => {
      console.log("Unknown error occured. Details: ")
      console.log(err)
    })
  }

  const todosFetcher = (e) =>{
    if (e !== "noevent") {e.preventDefault()} else {console.log("todosFetcher noevent")};


    fetch('http://localhost:4000/getTodos')
    .then(res => res.json())
    .then(json=>{
      setLoaded(true);
      setTodos(json);
    })
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    // console.log("ueEffect called");
    // console.log("loaded? ", loaded);
    if (loaded === false){
      todosFetcher("noevent");
    }else {
      // console.log("fetching condition returned false");
    }
  }, [loaded, todos]);

  // console.log(todos);

  if (loaded === false){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            YATA: Yet Another Todo-List App
          </h1>
          <br/>
          <h1>Still loading ...</h1>
        </header>
      </div>
    )
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            YATA: Yet Another Todo-List App
          </h1>
        </header>
        <main>
          <CreateTodo handleEdit={handleEdit} setEditable={setEditable} beingEdited={beingEdited} />
          <div id="todoList">
            <TodoList todos={todos} editing={editing} isDoneToggler={isDoneToggler} todoEdit={todoEdit} editable={editable} setEditable={setEditable} handleEdit={handleEdit} beingEdited={beingEdited} setBeingEdited={setBeingEdited}/>
          </div>
          <button onClick={(e)=>todosFetcher(e)}>todosFetcher</button>
        </main>
      </div>
    );
  }
}

export default App;
