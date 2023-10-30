import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState("")
    // We use useTodo here bcz we created it Custome hook for useContext 
    const {addTodo} = useTodo()

    const add= (e) => {
        e.preventDefault()
        // if there is no value in todo 
        if(!todo) return

        addTodo({ todo:todo , completed: false})
        setTodo("")
    }

  return (
    <form onSubmit={add} 
     className='flex'>
        <input type="text" placeholder='Write Todo List Here'
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
        className='w-full border border-black/10 rounded-l-lg px-3 py-1.5 outline-none duration-150 bg-white/20' />
        <button type='submit' className='rounded-r-lg px-3.5 py-1 bg-green-500 text-white shrink-0'>Add</button>
    </form>
  )
}

export default TodoForm