import axios from "axios";

const API = {
  // Retrieves all quotes from the db
  getQuotes: function() {
    return axios.get("/api/boards");
  },
  // Saves a new quote to the db
  saveQuote: function(text) {
    return axios.post("/api/boards", { name: text });
  },
  // Deletes a quote from the db
  deleteQuote: function(id) {
    return axios.delete(`/api/boards/${id}`);
  },
  // Toggles a quote's favorite property in the db
  favoriteQuote: function(quote) {
    // console.log(quote.favorited);
    quote.favorited = !quote.favorited;
    // console.log(quote.favorited);
    const { id, favorited } = quote;
    console.log(favorited)
    return axios.put(`/api/boards/${id}`, { favorited });
  }
};

export default API;
