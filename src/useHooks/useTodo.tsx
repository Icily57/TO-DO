// src/hooks/useTodos.ts
import { useReducer, useEffect } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

type State = Todo[];

type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'UPDATE_TODO'; payload: { id: number; text: string } }
    | { type: 'SET_TODOS'; payload: Todo[] };

const initialState: State = [];

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        case 'UPDATE_TODO':
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
        case 'SET_TODOS':
            return action.payload;
        default:
            return state;
    }
};

const useTodos = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state));
    }, [state]);

    return { state, dispatch };
};

export default useTodos;
