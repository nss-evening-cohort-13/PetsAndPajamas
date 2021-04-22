import React, { Component } from 'react';
import { Button } from 'reactstrap';
import pajamaData from '../helpers/data/pajamaData';

class ProductDetail extends Component {
  state = {
    pajama: {},
    loading: true
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const pajamaId = this.props.match.params.id;

    this.getPajama(pajamaId);
  }

  getPajama = (pajamaId) => {
    pajamaData.getSinglePajama(pajamaId).then((response) => {
      this.setState({
        pajama: response
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pajama, loading } = this.state;
    const thisPajama = pajama[0];
    return (
      <>
      { loading ? (
        <div><h2>Loading...</h2></div>
      ) : (
      <div>
          <h1>{thisPajama.title}</h1>
          <img src={thisPajama.image} alt={thisPajama.title}></img>
          <p>Price: ${thisPajama.price}</p>
          <p>{thisPajama.description}</p>
          <p>Size: {thisPajama.size}</p>
          <p>Color: {thisPajama.color}</p>
          <Button color='success'>Add to Cart</Button>

      </div>
      )
  }
      </>
    );
  }
}

export default ProductDetail;
