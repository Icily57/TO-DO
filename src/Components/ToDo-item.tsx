// src/components/TodoItem.tsx
import React from 'react';
import './ToDo-item.scss';

interface Props {
    todo: {
        id: number;
        text: string;
        completed: boolean;
    };
    onToggle: () => void;
    onDelete: () => void;
    onUpdate: (text: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [text, setText] = React.useState(todo.text);

    const handleUpdate = () => {
        onUpdate(text);
        setIsEditing(false);
    };

    return (
        <div className='Item'>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                />
            ) : (
                <span onClick={onToggle} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                </span>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
