export default function Form({ onHandleSubmit,value,setValue,onSortTasks,isLight }) {
  


    return (
        <form className={`form ${isLight ? 'form--light' : ''} `} action="" onSubmit={onHandleSubmit}>
        <button className="button--submit" type='submit'></button>
         
        <label htmlFor="">
          <input value={value} onChange={(e)=> setValue(e.target.value)} type="text" placeholder='Create a new todo...' />
        </label>
       
      </form>
      
    )
    
   }