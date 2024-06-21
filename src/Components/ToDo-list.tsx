
import React from 'react';
import './ToDo-list.scss'
import TodoItem from './ToDo-item';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface Props {
    todos: Todo[];
    dispatch: React.Dispatch<any>;
}

const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
    const handleToggle = (id: number) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const handleDelete = (id: number) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    const handleUpdate = (id: number, text: string) => {
        dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
    };

    return (
        <div className='List'>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => handleToggle(todo.id)}
                    onDelete={() => handleDelete(todo.id)}
                    onUpdate={(text) => handleUpdate(todo.id, text)}
                />
            ))}
        </div>
    );
};

export default TodoList;
      