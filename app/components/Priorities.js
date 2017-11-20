import React, { Component } from "react";
import Panel from "./common/Panel";
import API from "../utils/API";

class Priorities extends Component {
  constructor() {
    super();
    this.state = {
      quotes: []
    };
    // Binding getQuotes to this component since we'll be passing this method to 
    // other components to use
    this.getQuotes = this.getQuotes.bind(this);
  }
  // Getting all quotes once the component has mounted
  componentDidMount() {
    this.getQuotes();
  }
  getQuotes() {
    API.getQuotes().then((res) => {
      const favoriteQuotes = res.data.filter(quote => quote.favorited);
      this.setState({ quotes: favoriteQuotes });
      // console.log(this.state.quotes);
    });
  }
  // A helper method for rendering one panel for each quote
  renderQuotes() {
    return this.state.quotes.map(quote => (
      <Panel
        quote={quote}
        key={quote.id}
        getQuotes={this.getQuotes}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1>Priority Tasks</h1>
          <p>Your most urgent tasks.</p>
        </div>
        <div className="row">
          <hr />
          {this.renderQuotes()}
        </div>
      </div>
    );
  }
}

export default Priorities;
