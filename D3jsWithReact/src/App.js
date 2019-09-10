import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as d3 from "d3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    const temperatureData = [8, 5, 13, 9, 12];
    // d3.select(this.ref.current)
    //   .selectAll("h2")
    //   .data(temperatureData)
    //   .enter()
    //   .append("h2")
    //   .text(d => d * 2)
    //   .transition()
    //   .duration(1000)
    //   .style("background-color", "red");
    const data = [2, 4, 2, 6, 8];
    this.drawData(data);
  }

  drawData(data) {
    const canvasHeight = 400;
    const canvasWidth = 600;
    const scale = 20;
    const svgCanvas = d3
      .select(this.ref.current)
      .append("svg")
      .attr("width", 600)
      .attr("height", 400)
      .style("border", "1px solid black");
    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", datapoint => datapoint * 20)
      .attr("fill", "orange")
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", datapoint => canvasHeight - datapoint * scale);

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (dataPoint, i) => i * 45 + 10)
      .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
      .text(dataPoint => dataPoint);
  }
  render() {
    return <div className="App" ref={this.ref}></div>;
  }
}

export default App;
