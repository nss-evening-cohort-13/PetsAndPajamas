import React from 'react';
import pajamaData from '../helpers/data/pajamaData';
import ProductCard from '../components/ProductCard';
import FilterAccordion from '../components/FilterAccordion';
import pajamaTypeData from '../helpers/data/pajamaTypeData';

export default class CatStore extends React.Component {
  state = {
    pajamas: [],
    categories: []
  }

  componentDidMount() {
    this.getCatPJs();
    this.getPajamaTypes();
  }

  getPajamaTypes = () => {
    pajamaTypeData.getPajamaTypes().then((res) => {
      this.setState({
        categories: res
      });
    });
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
              <FilterAccordion categories={this.state.categories} />
            </div>
            <div className="product-cards-container">
              {this.state.pajamas.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)}
            </div>
          </div>
      </div>
    );
  }
}
