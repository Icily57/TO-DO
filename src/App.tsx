// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import useTodo from './useHooks/useTodo';
import TodoList from './Components/ToDo-list';
import './App.scss';

const lightTheme = {
    backgroundImage: './images/bg-desktop-light.jpg',
    background: '#fff',
    color: '#000',
};

const darkTheme = {
    backgroundImage: './images/bg-desktop-dark.jpg',
    background: '#000',
    color: '#fff',
};

const App: React.FC = () => {
    const { state: todos, dispatch } = useTodo();
    const [newTodo, setNewTodo] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch({ type: 'ADD_TODO', payload: newTodo });
            setNewTodo('');
        }
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
           <div className='Container'>
                < div className='Header'>
                <div className='img'>
                    <img  src ='./images/bg-desktop-dark.jpg' alt='background'/>
                </div>
                    <div className='h1'>
                     <h1>Todo App</h1>
                    </div>
                    <div className='Theme'>
                     <button className='btn' onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                     </button>
                    </div>
                </div>
                <div className='InputContainer'>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                    />
                    <button onClick={handleAddTodo}>Add Todo</button>
                </div>
                <div><TodoList todos={todos} dispatch={dispatch} /></div>
                
            </div>
        </ThemeProvider>
    );
};

export default App;
