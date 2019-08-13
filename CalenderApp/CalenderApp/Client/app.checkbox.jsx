import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    toggleCheckboxChange() {
        const { label } = this.props;
        this.setState({ isChecked: !this.state.isChecked });

        this.props.handleCheckboxChange(label, !this.state.isChecked);
    }

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;

        return <div>
            <label>
                <input type="checkbox" value={label} checked={isChecked} onChange={this.toggleCheckboxChange} />{label}
            </label>
            </div>
    }
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired
}