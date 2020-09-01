import React from "react";

//TODO: implement form

/**
 * Form for number input
 */
export default class NumberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        // TODO: add components based on input
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
