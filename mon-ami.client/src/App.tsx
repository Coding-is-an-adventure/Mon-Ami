import { render } from "@testing-library/react";
import Axios, { AxiosResponse } from "axios";
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get('https://localhost:44380/api/values')
    .then((response: AxiosResponse<any>) => {
      console.log(response);
      this.setState({
        values: response.data
      })
    })   
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.values.map((value: any) => {
            <li key={value.id}>{value.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
