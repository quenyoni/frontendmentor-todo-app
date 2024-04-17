export default function TODOInfo({clearCompleted,itemsLeft}) {
    return (
        <div className=" todo__item info__bar">
            <span>{ itemsLeft? `${itemsLeft} ${itemsLeft>1?'items':'item'} left` :'Add new tasks'} </span>
<a onClick={()=>{clearCompleted()}}>Clear Completed</a>


        </div>
      )
  }