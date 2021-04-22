import React from 'react';
import pajamaData from '../helpers/data/pajamaData';
import ProductCard from '../components/ProductCard';
import FilterAccordion from '../components/FilterAccordion';

export default class CatStore extends React.Component {
  state = {
    pajamas: []
  }

  componentDidMount() {
    this.getCatPJs();
  }

  getCatPJs = () => {
    pajamaData.getCatPajamas().then((res) => {
      this.setState({
        pajamas: res
      });
    });
  }

  render() {
    return (
      <div className="cat-store-page">
          <h1>Cats</h1>
          <div className="cat-store-body">
            <div className="accordion-container">
              <FilterAccordion />
            </div>
            <div className="product-cards-container">
              {this.state.pajamas.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)}
            </div>
          </div>
      </div>
    );
  }
}
