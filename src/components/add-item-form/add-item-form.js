import React, {Component} from "react";

export default class AddItemForm extends Component
{
    state = {
        label: ''
    };

    submit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        });
    };

    onLablelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    render() {
        return (
            <form className="form-inline mt-3 form-add-item" onSubmit={this.submit}>
                <div className="form-group mr-3 mb-2">
                    <label htmlFor="addItem" className="sr-only">text for new item</label>
                    <input
                        type="text"
                        className="form-control"
                        id="addItem"
                        value={this.state.label}
                        placeholder="text for new item"
                        onChange={this.onLablelChange}/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Add item</button>
            </form>
        );
    }
}