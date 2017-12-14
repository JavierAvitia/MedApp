import React, { Component } from "react";
import Time from "./Time";
import Panel from "../common/Panel";
import QuoteForm from "../common/QuoteForm";
import API from "../../utils/API";
import moment from "moment";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet:null,
      date:null,
      clockIn:null,
      clockOut:null,
      lunchIn:null,
      lunchOut:null,
      times:[]
    };
    // Binding getQuotes to our component since we'll be passing this
    // method to child components
    this.getTime = this.getTime.bind(this);
    this.clockIn = this.clockIn.bind(this);
    this.getTimeSheet = this.getTimeSheet.bind(this);
  }
  // Getting all quotes when the component mounts
  componentDidMount() {
    this.getTime();
    console.log(this.props);
  }

  getTime() {
    var time = moment();
    var date = time.format("dddd, MMMM Do YYYY");

    this.setState({
      date
    });
    console.log(date,"dog");
    this.getTimeSheet("date",date);
  }

  // A helper method for rendering one panel for each quote
  fireLaser() {
    console.log("PEW PEW");
  }

  getTimeSheet(term,query){
    API.getTimesheet(term,query).then((res) => {
      if(res.data[0]){
        console.log(res,"cat");
        this.setState({
          timesheet: res.data[0].id,
          times: Object.entries(res.data[0]).slice(2,6)
        });
       // console.log(Object.entries(res.data[0]).slice(2,6));
       // console.log(this.state.timesheet);
      }
      // console.log(res.data);
    });
  }

  clockIn() {
    if(!this.state.timesheet){
      // console.log(this.state.timestamp);
      // this.setState({ quotes: res.data });
      API.clockIn(this.state.date,moment()).then((res) => {
        // console.log(moment(res.data.clockIn).format());
        this.getTimeSheet("date",this.state.date);
        // this.setState({ quotes: res.data });
      });
    }
  }

  lunchIn() {
    if(this.state.timesheet){
      // console.log(this.state.timestamp);
      // this.setState({ quotes: res.data });
      API.lunchIn(this.state.timesheet,moment()).then((res) => {
        //console.log(res.data);
        this.getTimeSheet("id",this.state.timesheet);
        // this.setState({ quotes: res.data });
      });
    }
  }

  lunchOut() {
    if(this.state.timesheet){
      // console.log(this.state.timestamp);
      // this.setState({ quotes: res.data });
      API.lunchOut(this.state.timesheet,moment()).then((res) => {
        //console.log(res.data);
        this.getTimeSheet("id",this.state.timesheet);
        // this.setState({ quotes: res.data });
      });
    }
  }

  clockOut() {
    if(this.state.timesheet){
      // console.log(this.state.timestamp);
      // this.setState({ quotes: res.data });
      API.clockOut(this.state.timesheet,moment()).then((res) => {
        //console.log(res.data);
        this.getTimeSheet("id",this.state.timesheet);
        // this.setState({ quotes: res.data });
      });
    }
  }

  // A helper method for rendering one panel for each quote
  renderTimes() {
    return this.state.times.map(time => (
      <Time
        title={time[0].toLowerCase().replace("in","-in").replace("out","-out")}
        time={time[1] != null ? moment(time[1]).format("h:mm:ss a") : ""} //conditional to replace nulls
        key={time[0]}
      />
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1>{this.props.username}</h1>
          <p>{this.state.date}</p>
          <div className="panel panel-default divBorder cIN" onClick={() => this.clockIn()}>
            <div className="panel-body">
              CLOCK-IN
            </div>
          </div>
          <div className="panel panel-default divBorder cLUNCH" onClick={() => this.lunchIn()}>
            <div className="panel-body">
              START LUNCH
            </div>
          </div>
          <div className="panel panel-default divBorder cLUNCH" onClick={() => this.lunchOut()}>
            <div className="panel-body">
              END LUNCH
            </div>
          </div>
          <div className="panel panel-default divBorder cOUT" onClick={() => this.clockOut()}>
            <div className="panel-body">
              CLOCK-OUT
            </div>
          </div>
          <div className="row">
            <hr />
            {this.renderTimes()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
