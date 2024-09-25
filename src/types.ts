import React from "react";

export interface ITodoItem {
    id: number,
    text: string,
    completed: boolean
}
export interface ITodoFormProps {
    todos: ITodoItem[];
    setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}
export interface ITodoListProps {
    todos: ITodoItem[];
    setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>> | any;
}
export interface ITodoItemProps {
    todo: ITodoItem;
    setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}