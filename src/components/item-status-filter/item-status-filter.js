import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    
    state = {
        state: 'all'  
    };

    filterTodoList = (e) => {
        const state = e.target.value;
        this.setState({state});
        this.props.onFilter(state);
    };

    getBtnClassNames(value) {
        const { state } = this.state;

        let classNames = 'btn btn-sm';

        if (value === state) {
            classNames += ' btn-info';
        } else {
            classNames += ' btn-outline-secondary';
        }

        return classNames;
    }
    
    render() {

        return (
            <div className="btn-group ml-3 mb-3">
                <button type="button"
                        className={this.getBtnClassNames('all')}
                        value="all"
                        onClick={this.filterTodoList}>All</button>
                <button type="button"
                        className={this.getBtnClassNames('active')}
                        value="active"
                        onClick={this.filterTodoList}>Active</button>
                <button type="button"
                        className={this.getBtnClassNames('important')}
                        value="important"
                        onClick={this.filterTodoList}>Important</button>
                <button type="button"
                        className={this.getBtnClassNames('done')}
                        value="done"
                        onClick={this.filterTodoList}>Done</button>
            </div>
        );
    }
}