import { useState } from 'react'
import Form from './components/Form';
import TODOHeader from './components/TODOHero';
import TODOList from './components/TODOList';
import './App.css'

function App() {
const [isLight,setIsLight] = useState(!true)
  const [value, setValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);
const [taskEdit,setTaskEdit] = useState(undefined)
  const [tasks, setTasks] = useState(loadData()||[])


  function loadData() {
    return JSON.parse(localStorage.getItem('tasks'));
  }
  
localStorage.setItem('tasks',JSON.stringify(tasks))

  function sortTasks() {
   
    if (!isSorted) {
      const sortedTasks = tasks.slice().sort((a, b) => b.date - a.date);
      setTasks(()=> sortedTasks)

    }
    else {
      const sortedTasks2 = tasks.slice().sort((a, b) => a.date - b.date);
      setTasks(()=> sortedTasks2)
     
    }

    

    setIsSorted(()=> !isSorted)
  }

  function editTaskHandler(taskObject) {
  
    console.log(taskObject.todo);
   
}


  function handleEdit(id:string) {

    const tasktoEdit = tasks.find(task => task.id === id)
setTaskEdit(tasktoEdit)

    if (taskEdit.isComplete) {
      alert('Cannot Edit a Complete  Task')
      return
    }
    // console.log(tasktoEdit);
    setValue(tasktoEdit.todo)

   
  }

  function createNewTask(value:string) {
    
    return {
      todo: value.trim(),
      id: crypto.randomUUID(),
      isComplete: false,
      date:Date.now()
  }
  }

  function handleSubmit(e) {

    e.preventDefault();
    if (!value) return

    if (taskEdit) { 

      const tasksMinusEditedTask = tasks.filter(task => task.id !== taskEdit.id )

      setTasks(()=>[...tasksMinusEditedTask,{...taskEdit,todo:value}])



   
    }
    else {
      setTasks(() => [...tasks, createNewTask(value)])
    }
    

    setValue('')
    setTaskEdit(undefined)

    
    
  }

  function handleDelete(id:string) {

    if (window.confirm("Are you sure you want to Delete it?")) {
      const tasksNotToDelete = tasks.filter(task => task.id !== id);
    
      setTasks(() => tasksNotToDelete);

    }
  }


  function clearCompleted()
  {
    const itemsIncompleted = (tasks.slice().filter(im => !im.isComplete))
    if (tasks.length - itemsIncompleted.length === 0) {
      alert("No Tasks to Clear!");
      return;
    }
    if (window.confirm("Are you sure?")) {
      console.log('cleared');
      
    

      setTasks(()=> itemsIncompleted)
     
   }
    
  }
  
  

  const itemsLeft = (tasks.slice().filter(im => !im.isComplete)).length
  
  return (
    <main className={`${isLight ? 'light' : ''}`}>
      
      <TODOHeader isLight={isLight}  />
      <Container isLight={isLight} setIsLight={setIsLight}>

        <div className='upper__container'>
          <span>
          TODO
          </span>
          <button onClick={()=> setIsLight(!isLight)}>
            Switch
          </button>
          
     </div>
      <Form onHandleSubmit={handleSubmit} setValue={setValue}
        value={value} onSortTasks={sortTasks} isLight={isLight} /> 
        <TODOList onSetTasks={setTasks} onTasks={tasks} onHandleEdit={handleEdit} onHandleDelete={handleDelete} clearCompleted={clearCompleted } itemsLeft={itemsLeft} />
      
       </Container>
  
    </main>
  )
}

export default App


function Container({ children,isLight }) {
  return <section className={`${isLight? 'light':''}`}>
    {children}
  </section>
}





