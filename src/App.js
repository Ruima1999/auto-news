
import Header from './components/Header'
import React from 'react';
import Tasks from './components/Tasks'
import AddTask from './components/subscribe'
import {useState, useEffect} from 'react'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Button from './components/Button';
import Button_unsub from './components/button_unsub'
import unsub from './components/unsub'
import success from './components/UnsubSuccess'
const App=() => {
  const [showAddTask,setShowAddTask] =useState(true)
  const [tasks,setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE',})
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify(updTask),
      }
    )
    setTasks(tasks.map((task)=> task.id===id ?{...task,reminder: !task.reminder}:task))
  }
  const addTask = async (task) =>{
    const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task),
  }
    )
    const data = await res.json()
    setTasks([...tasks, data])
    
    //const id = Math.floor(Math.random()*10000 )+1
    //const newTask ={id, ...task}
    //setTasks([...tasks, newTask])
  }
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={()=>setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
             

              <Button_unsub color='white' text='unsubscribe' ></Button_unsub>
            </>
          )}
        />
         <Route path='/unsub' component={unsub} />
         <Route path='/about' component={About} />
         <Route path ='/success/' component ={success} />
        <Footer />
      </div>
    </Router>
  )
}

export default App