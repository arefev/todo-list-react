import React from "react";
import TodoListItem from "../todo-list-item";

export default function TodoList ({items, onDelete, toggleDone, toggleImportant}) {
    
    const elems = items.map((item) => {
        const {id, label, done, important} = item;
        return (
            <li className="list-group-item" key={id}>
                <TodoListItem
                    onDelete={() => onDelete(id)}
                    toggleImportant={() => toggleImportant(id)}
                    toggleDone={() => toggleDone(id)}
                    label={label}
                    important={important}
                    done={done}
                />
            </li>
        );
    });

    return (
        <ul className="list-group">
            {elems}
        </ul>
    );
}