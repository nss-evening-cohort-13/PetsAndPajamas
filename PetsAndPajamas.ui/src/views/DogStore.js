import React from 'react';
import pajamaData from '../helpers/data/pajamaData';
import pajamaTypeData from '../helpers/data/pajamaTypeData';
import ProductCard from '../components/ProductCard';

export default class DogStore extends React.Component {
  state = {
    pajamas: [],
    categories: []
  }

  componentDidMount() {
    this.getDogPajamas();
    this.getPajamaTypes();
  }

  getPajamaTypes = () => {
    pajamaTypeData.getPajamaTypes().then((response) => {
      this.setState({
        categories: response
      });
    });
  }

  getDogPajamas = () => {
    pajamaData.getDogPajamas().then((response) => {
      this.setState({
        pajamas: response
      });
    });
  }

  render() {
    return (
      <div className="dog-store-page">
        <h1>Dog Pajamas</h1>
        <div className="dog-store-body">
        </div>
        <div className="product-cards-container">
          {this.state.pajamas.map((pajama) => <ProductCard key={pajama.id} pajama={pajama} />)}
        </div>
      </div>
    );
  }
}
