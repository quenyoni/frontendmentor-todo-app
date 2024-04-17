

export default function Item({
    data,
    onHandleEdit,
    handleDragStart,
    handleDragOver,
    handleDrop,
    index,
    onHandleDelete,
    onHandleComplete}) {
    return <li className="todo__item animate__down" draggable={true}
    onDragStart={(e) => handleDragStart(e, index)} 
    onDragOver={handleDragOver} 
    onDrop={(e) => handleDrop(e, index)}
    
   key={data.id}>
    <input onChange={()=>onHandleComplete(data.id) } type='checkbox' checked={data.isComplete} />
    <span>
    {data.todo}
    </span>
        <div className="todo__item__button__group">
            

    <button className="button--edit" disabled={data.isComplete} onClick={()=> onHandleEdit(data.id)}>&#9998;</button >
        <button onClick={() => onHandleDelete(data.id)}>
            <img src="/icon-cross.svg" alt="" />
            </button >
            </div>
  
  
  
  </li>;
}