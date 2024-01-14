import * as React from 'react';
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => {
        setTodos(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }); 

  const removeTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        console.log('todo deleted successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleTodo = (id) => {
    axios.get(`http://localhost:5000/todos/${id}`)
      .then((res) => {
        if (res.data && res.data.text && res.data.completed !== undefined) {
          const text = res.data.text;
          const completed = !res.data.completed;
  
          axios.put(`http://localhost:5000/todos/${id}`, { text, completed })
            .then(() => {
              console.log('todo updated successfully');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('Unexpected data structure in response');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  const addTodo = (text) => {
    const data = {
      text: text,
      completed: false,
    };

    axios.post('http://localhost:5000/todos', data)
      .then(() => {
        console.log('todo added successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      m: 3,
    }}>
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        Todos
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onremove={() => removeTodo(todo._id)} toggle={() => toggleTodo(todo._id)} />
        ))}
        <TodoForm addTodo={addTodo} />
      </List>
    </Box>
  );
};

export default ToDoList;
