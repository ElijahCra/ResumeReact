import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import Header from "./Components/Header";

import About from "./Components/About";
import Resume from "./Components/Resume";
/*import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";
import Footer from "./Components/Footer";*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();

  }


  render() {
    return (
        <div className="App">
          <Header data={this.state.resumeData.main} />

          {this.state.resumeData.resume ? ( // Check if resume data exists
              <Resume data={this.state.resumeData.resume} />
          ) : (
              <div>Loading Resume...</div> // Or display a loading indicator
          )}
          <About data={this.state.resumeData.main} />
        </div>
    );
  }
}

export default App;
