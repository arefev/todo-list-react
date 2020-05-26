import React from "react";
import './todo-list-item.css';

export default function TodoListItem({label, done, important, onDelete, toggleDone, toggleImportant}) {
    let classNames = "todo-list-item";

    if (important) {
        classNames += " important";
    }

    if (done) {
        classNames += " done";
    }

    return (
        <div className={classNames}>
            <span
                className="todo-list-item-label"
                onClick={toggleDone}
            >
                {label}
            </span>

            <div className="btn-toolbar float-right">
                <div className="btn-group mr-2">
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>

                    <button type="button" className="btn btn-outline-success btn-sm" onClick={toggleImportant}>
                        <i className="fa fa-exclamation"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};