import React, {Component} from 'react';

import Header from "../header";
import Search from "../search";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItemForm from "../add-item-form";

import ApiService from "../../services/api-service";

import './app.css';

export default class App extends Component {

    apiService = new ApiService();

    state = {
        items: [],
        term: '',
        filter: 'all'
    };
    
    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        this.apiService
            .getItems()
            .then(this.onItemsLoaded)
            .catch(this.onError);
    }

    onItemsLoaded = (items) => {
        this.setState(() => {
            return {
                items: items
            }
        })
    };

    onError = (error) => {
        console.log(error);
    };

    deleteItem = (id) => {
        this.apiService
            .deleteItem(id)
            .then(() => {
                this.loadItems();
            })
            .catch(this.onError);
    };

    toggleImportant = (id) => {
        this.apiService
            .important(id)
            .catch(this.onError);

        this.toggleProp(id, 'important');
    };

    toggleDone = (id) => {
        this.apiService
            .done(id)
            .catch(this.onError);

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
        this.apiService
            .saveItem(label)
            .then(() => {
                this.loadItems();
            })
            .catch(this.onError);
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