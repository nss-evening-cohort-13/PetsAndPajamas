import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchInput extends Component {
  state = {
    text: ''
  }

   handleSubmit = (e) => {
     e.preventDefault();
     this.props.history.push(`/search/${this.state.text}`);

     this.setState({
       text: ''
     });
   }

   handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value,
     });
   }

   render() {
     return (
      <form onSubmit={this.handleSubmit}>
      <input type='text' name='text' value={this.state.text} onChange={this.handleChange} />
    </form>
     );
   }
}

export default withRouter(SearchInput);
