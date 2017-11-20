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
    // console.log(id);
    return axios.put(`/api/boards/${id}`, { favorited });
  },
  //
  getTimesheet: function(term,query) {
    return axios.get(`/api/timesheet?${term}=${query}`);
  },
  //
  clockIn: function(date,clockIn) {
    return axios.post("/api/clockIn", { date, clockIn });
  },
  //
  lunchIn: function(id,lunchIn) {
    return axios.put(`/api/timesheet/${id}`, { lunchIn });
  },
  //
  lunchOut: function(id,lunchOut) {
    return axios.put(`/api/timesheet/${id}`, { lunchOut });
  },
  //
  clockOut: function(id,clockOut) {
    return axios.put(`/api/timesheet/${id}`, { clockOut });
  }
};

export default API;
