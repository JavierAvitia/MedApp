import axios from "axios";

const API = {
  //Task APIs
  // Retrieves all quotes from the db
  getTasks: function() {
    return axios.get("/api/tasks");
  },
  // Saves a new quote to the db
  saveTask: function(text) {
    return axios.post("/api/tasks", { name: text });
  },
  // Deletes a quote from the db
  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },
  // Toggles a quote's favorite property in the db
  priorityTask: function(task) {
    // console.log(quote.favorited);
    task.priority = !task.priority;
    // console.log(quote.favorited);
    const { id, priority } = task;
    // console.log(id);
    return axios.put(`/api/tasks/${id}`, { priority });
  },
  //end Tasks

  //Timesheet APIs
  getTimesheet: function(term,query) {
    return axios.get(`/api/timesheet?${term}=${query}`);
  },
  //end Timesheet

  //Clock APIs
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
  },
  //end Clock

  //User APIs
  saveUser: function(name,email,password) {
    return axios.post("/api/users", { name, email, password });
  },
  //
  loginUser: function(name,password) {
    var queryName = 'name';

    if (name.indexOf('@') != -1) {
        queryName = 'email';
    }

    return axios.post("/api/users/login?" + queryName + "=" + name, { name, password });
  }
  //end User
};

export default API;
