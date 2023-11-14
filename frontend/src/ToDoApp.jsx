import { useState, useEffect } from "react"
import { v4 as uuid } from 'uuid'
import List from "./List";
import AddItems from "./AddItems";

function ToDoApp() {
  const [tasks, setTasks] = useState([])
  const [errorText, setErrorText] = useState()

  // function to get data
  const getTodos = async () => {
    try {
      // request
      let response = await fetch(`${import.meta.env.VITE_SERVER_TODOS}/todos`)
      // read the body
      let data = await response.json()
      // find the todos:
      let todosFromServer = data.my_data
      setTasks(todosFromServer)
    } catch (error) {
      console.log(error);
      setErrorText('Could not get data')
    }
  }
  // function to post data: 
  const postTodo = async (newTodo) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SERVER_TODOS}/todos`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      })
      if(response.status === 201) {
        alert('Data was saved')
      } else {
        let error = new Error(`Could not Post ${response.url}`)
        throw error
      }
    } catch (error) {
      console.log(error);
      setErrorText('Could not save the data')
    }
  }
  // function to delete one item
  const deleteTodo = async (id) => {
    let response = await fetch(`${import.meta.env.VITE_SERVER_TODOS}/todos/${id}`, {
      method: 'DELETE'
    })
    console.log(response);
  }

   // function to post data: 
   const updateTodo = async (updatedTodo) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_SERVER_TODOS}/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo)
      })
      if(response.status === 200) {
        alert('Data was updated')
      } else {
        let error = new Error(`Could not update ${response.url}`)
        throw error
      }
    } catch (error) {
      console.log(error);
      setErrorText('Could not update the data')
    }
  }

  useEffect(() => {
    // replace reading from local storage with fetch api
    // call function to get data
    getTodos()
  }, [])
// delete this use effect to remove the saving to local storage when the tasks change (update,delete,create)
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(tasks))
  // }, [tasks])


  const deleteTask = (id) => {
    let remainingTasks = tasks.filter(item => item.id !== id)
    setTasks(remainingTasks)
    deleteTodo(id)
  }

  const deleteAllTasks = () => {
    setTasks([])
  }

  const addTask = (text) => {
    // create object for new task
    let newTask = { task: text, status: 'open', id: uuid() }
    // save to state
    setTasks([...tasks, newTask])
    // post data to server:
    postTodo(newTask)
  }

  const editTask = (itemToUpdate) => {
    let updatedTasks = tasks.map(item => item.id == itemToUpdate.id ? { ...item, task: itemToUpdate.task } : item)
    setTasks(updatedTasks)
    updateTodo(itemToUpdate)
  }

  return (
    <div className="ToDoApp h-50">
      <h1 className="mb-3">My To Do List / MongoDB edition</h1>
      <AddItems addOneItem={addTask} />
      {errorText ? <p>{errorText}</p> : <></>}
      <List tasks={tasks} deleteItem={deleteTask} deleteAllTasks={deleteAllTasks} editItem={editTask} />
    </div>
  )
}


export default ToDoApp