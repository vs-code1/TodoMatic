import {useState} from 'react';
import { nanoid } from 'nanoid';

import './app.css'
import Form from './components/Form';

import Todo from './components/Todo';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const toggleTaskCompleted = (id) => {
    const updateTasks = tasks.map(item => {
      if (id === item.id){
        return {...item, completed : !item.completed};
      }else{
        return item;
      }
    })
    setTasks(updateTasks);
  }

  const deleteTask = (id) => {
    const reamainingTask = tasks.filter(item => id !== item.id );
    setTasks(reamainingTask);
  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(item => {
      if (id === item.id){
        return {...item, name : newName};
      }
      return item;
    })

    setTasks(editedTaskList);
  }

  const taskList = tasks.map(task => 
    <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id} 
      toggleTaskCompleted={toggleTaskCompleted} 
      handleDelete={deleteTask}
      handleEdit={editTask}
      key={task.id}  
    />  
  )

  const addTask = (name) => {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([ ...tasks , newTask ]);
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} reamaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >

          {taskList}
        
        </ul>
    </div>
  );
}

export default App;
