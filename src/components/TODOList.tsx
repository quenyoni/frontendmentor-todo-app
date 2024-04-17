import Item from "./Item";
import TODOInfo from "./TodoInfo";

export default function TODOList({ onTasks, onHandleEdit, onHandleDelete, onSetTasks, clearCompleted, itemsLeft }) {

    function onHandleComplete(id) {
      
      const otherTasks = onTasks.filter(item => item.id !== id)
      const changeComplete = onTasks.find(item => item.id === id)
  

     onSetTasks(()=> [...otherTasks,{...changeComplete,isComplete:true}])
     
  
    }
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index.toString());
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const startIndex = parseInt(e.dataTransfer.getData('index'));
        const draggedTodo = onTasks[startIndex];
    
        // Reorder todos array
        const updatedTodos = onTasks.filter((todo, index:number) => index !== startIndex);
        updatedTodos.splice(targetIndex, 0, draggedTodo);
        
        onSetTasks(updatedTodos);
      };
    
    

    return (
      <div className="todo__list__container">
        
  
      {
          onTasks.length && onTasks ?
            
            <ul>
        
                        {onTasks.map((uniqueItem,index) => <Item index={index} key={uniqueItem.id} data={uniqueItem} onHandleEdit={onHandleEdit}
                          handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDrop={handleDrop}
                          onHandleComplete={onHandleComplete}
                        onHandleDelete={onHandleDelete}/>)
            }</ul>
            :
            
            
            <p style={{ alignSelf:'center', justifySelf:'center',placeSelf: `center stretch`}}>Nothing to see here. Add a task above.</p>
            }

            {onTasks.length>0 &&<TODOInfo clearCompleted={clearCompleted} itemsLeft={itemsLeft} />}
      
  
      </div>
    )
}
  
