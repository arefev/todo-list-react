import React from "react";

export default function Search({onSearch}) {
    return (
        <form>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="search item"
                    onChange={onSearch}/>
            </div>
        </form>
    );
}