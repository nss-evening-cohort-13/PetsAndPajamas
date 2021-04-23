import React from 'react';

export default class AccordionCheckbox extends React.Component {
  render() {
    const { category, quantity, filterProducts } = this.props;
    return (
            <div className="checkbox-div">
            <input type="checkbox" className="single-checkbox" value={category.type} onChange={(e) => filterProducts(e)}></input>
            <label>{category.type} ({quantity})</label>
            </div>
    );
  }
}
