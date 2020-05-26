import React, {Component} from 'react';
import Header from "../header";
import Search from "../search";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItemForm from "../add-item-form";

import './app.css';

export default class App extends Component {

    maxId = 1;

    state = {
        items: [
            this.createItem('Wake up at 08:00'),
            this.createItem('Have a breakfast'),
            this.createItem('Learn JavaScript')
        ],
        term: '',
        filter: 'all'
    };

    deleteItem = (id) => {
        this.setState(({items}) => {
            return {
                items: items.filter((item) => item.id !== id)
            };
        });
    };

    toggleImportant = (id) => {
        this.toggleProp(id, 'important');
    };

    toggleDone = (id) => {
        this.toggleProp(id, 'done');
    };

    toggleProp = (id, prop) => {
        this.setState(({items}) => {
            const newItems = items.map((item) => {
                if (id === item.id) {
                    item[prop] = !item[prop];
                }
                return item;
            });

            return {
                items: newItems
            }
        });
    };

    onSearch = (e) => {
        this.setState({
            term: e.target.value
        });
    };

    search = (items, term) => {
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };

    onFilter = (filter) => {
        this.setState({filter});
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'done':
                return items.filter((item) => item.done);
            case 'active':
                return items.filter((item) => !item.done);
            case 'important':
                return items.filter((item) => item.important);
            default:
                return items;
        }
    };

    addItem = (label) => {
        this.setState(({items}) => {
            const newItems = [
                ...items,
                this.createItem(label)
            ];

            return {
                items: newItems
            }
        });
    };

    createItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };


    render() {

        const {items, term, filter} = this.state;
        const visibleItems = this.filter(
            this.search(items, term),
            filter
        );

        return (
            <div className="container todo-list-app">

                <Header/>

                <div className="top-panel d-flex">
                    <Search onSearch={this.onSearch}/>
                    <ItemStatusFilter onFilter={this.onFilter}/>
                </div>

                <TodoList
                    items={visibleItems}
                    onDelete={this.deleteItem}
                    toggleImportant={this.toggleImportant}
                    toggleDone={this.toggleDone}
                />

                <AddItemForm addItem={this.addItem}/>

            </div>
        );
    }
}