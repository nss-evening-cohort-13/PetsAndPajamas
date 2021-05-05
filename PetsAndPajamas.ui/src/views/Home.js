import React from 'react';
import pajamaData from '../helpers/data/pajamaData';
import ProductCard from '../components/ProductCard';

export default class Home extends React.Component {
  state = {
    pajamas: []
  }

  componentDidMount() {
    this.getLatest();
  }

  getLatest = () => {
    pajamaData.getLatestPajamas().then((res) => {
      this.setState({
        pajamas: res,
      });
    });
  }

  render() {
    const { pajamas } = this.state;
    return (
      <>
      <h1 className="home-header">
        Hello fellow pet lovers! Welcome to Pets & Pajamas where we provide high-quality sleepwear for felines and canines.
      </h1>
      <div style={{
        backgroundImage: 'url("https://i.imgur.com/D8NHcBA.png")'
      }} className="jumbotron-container"></div>
    <h2 className="home-h2">Latest Products</h2>
    <div className="product-cards-container">
    {pajamas.map((p) => <ProductCard key={p.id} pajama={p} />)}
    </div>
    </>
    );
  }
}
