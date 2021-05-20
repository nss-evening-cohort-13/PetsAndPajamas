/* eslint-disable no-unused-expressions */
import React from 'react';
import pajamaData from '../helpers/data/pajamaData';
import ProductCard from '../components/ProductCard';
import FilterAccordion from '../components/FilterAccordion';

export default class CatStore extends React.Component {
  state = {
    pajamas: [],
    isChecked: []
  }

  componentDidMount() {
    this.getCatPJs();
  }

  getCatPJs = () => {
    pajamaData.getCatPajamas().then((res) => {
      this.setState({
        pajamas: res,
      });
    });
  }

  filterProducts = (e) => {
    const checkedType = e.target.value;
    const { isChecked, pajamas } = this.state;

    if (e.target.checked && isChecked.length === 0) {
      const newChecked = pajamas.filter((p) => p.pajamaType.type === checkedType);
      this.setState({
        isChecked: newChecked
      });
    } else if (e.target.checked && isChecked.length > 0) {
      const currentlyChecked = isChecked;
      const newChecked = pajamas.filter((p) => p.pajamaType.type === checkedType);
      currentlyChecked.forEach((p) => {
        newChecked.push(p);
      });
      this.setState({
        isChecked: newChecked
      });
    } else if (!e.target.checked) {
      const minusTarget = isChecked.filter((p) => p.pajamaType.type !== checkedType);
      this.setState({
        isChecked: minusTarget
      });
    }
  }

  render() {
    return (
      <div className="store-page">
          <h1 className="store-category-h1-cat">Cat Pajamas</h1>
          <div className="store-body">
            <div className="accordion-container">
              <FilterAccordion pajamas={this.state.pajamas} filterProducts={this.filterProducts} />
            </div>
            <div className="product-cards-container">
              {this.state.isChecked.length === 0
                ? this.state.pajamas.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)
                : this.state.isChecked.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)}
            </div>
          </div>
      </div>
    );
  }
}
