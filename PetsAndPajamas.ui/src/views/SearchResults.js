import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import pajamaData from '../helpers/data/pajamaData';

class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: ''
  }

  componentDidMount() {
    this.populateResults();
  }

   populateResults = () => {
     const searchTerm = this.props.match.params.term;

     pajamaData.getSearchedPajamas(searchTerm.toLowerCase())
       .then((response) => {
         this.setState({
           results: response,
           searchTerm
         });
       });
   }

   componentDidUpdate(prevState) {
     if (prevState.searchTerm !== this.props.match.params.term) {
       this.populateResults();
     }
   }

   render() {
     const { results } = this.state;

     const showResults = () => (
       results.map((result) => (
        <ProductCard key={result.id} pajama={result} />
       ))
     );
     return (
      <div className="dog-store-page">
      {results.length === 0 ? <h1>No products found</h1> : <h1>Search Results</h1>}
      <div className="dog-store-body">
        </div>
        <div className="product-cards-container">
        {showResults()}
      </div>
    </div>
     );
   }
}

export default SearchResults;
