import React from 'react';
import pajamaData from '../helpers/data/pajamaData';
import ProductCard from '../components/ProductCard';
import FilterAccordion from '../components/FilterAccordion';

export default class DogStore extends React.Component {
  state = {
    pajamas: [],
    isChecked: []
  }

  componentDidMount() {
    this.getDogPajamas();
  }

  getDogPajamas = () => {
    pajamaData.getDogPajamas().then((response) => {
      this.setState({
        pajamas: response
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
      <div className="dog-store-page">
        <h1>Dog Pajamas</h1>
        <div className="dog-store-body">
        </div>
        <div className="accordion-container">
           <FilterAccordion pajamas={this.state.pajamas} filterProducts={this.filterProducts} />
         </div>
        <div className="product-cards-container">
          {this.state.isChecked.length === 0
            ? this.state.pajamas.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)
            : this.state.isChecked.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)}
        </div>
      </div>
    );
  }
}
