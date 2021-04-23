import React from 'react';

export default class AccordionCheckbox extends React.Component {
  render() {
    const { category, amount } = this.props;
    return (
            <div className="checkbox-div">
            <input type="checkbox" className="single-checkbox"></input>
            <label>{category.type} ({amount})</label>
            </div>
    );
  }
}
