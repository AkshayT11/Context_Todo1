import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './Components/TodoForm'
import TodoItems from './Components/TodoItems'

function App() {
  const [todos, setTodos] = useState([])

  //we want old todos value so use callback prev 
  const addTodo = (todo) => {
    setTodos((prev) => [{id:Date.now(),...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo ) ))
  }

  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((todo) => todo.id != id ))
  }

  const toggleComplete = (id) => {
    setTodos((prev)=> prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}  : prevTodo ))
  }

  // To use Local Storage 

  useEffect(()=> {
   const todos = JSON.parse(localStorage.getItem("todos"))

   if(todos && todos.length > 0 ){
     setTodos(todos)
   }

  },[]);

  // for set Item local storage

  useEffect(()=> {
    localStorage.setItem("todos",JSON.stringify(todos) )
  },[todos])


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}} >
        <div className='bg-[#172842] min-h-screen py-8 '>
          <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
            <h1 className='text-4xl font-bold text-center mb-8 mt-2'>Manage Todos</h1>
            <div className="mb-4">
            {/* Todo Start  Here */}
            <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3 ">
              {/* Loop and Add TodoItem here */}
              {todos.map((td)=> (
                <div key={td.id} className='w-full' >
                    <TodoItems todo={td} />
                </div>
              ) )}
            </div>
          </div>
        </div>
    </TodoProvider>
  )
}

export default App
