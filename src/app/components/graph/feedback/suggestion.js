import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const HorizontalBarChart = () => {
  const data = [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "J", frequency: 0.00153 },
  ];
  const chartRef = useRef();

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = () => {
    const chartContainer = document.getElementById("suggestion");
    if (chartContainer) {
      setContainerWidth(chartContainer.clientWidth);
      setContainerHeight(chartContainer.clientHeight);
      drawChart();
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, containerWidth]);

  const drawChart = () => {
    chartRef.current.innerHTML = "";
    // Specify the chart’s dimensions, based on a bar’s height.
    const barHeight = 85;
    const marginTop = 70;
    const marginRight = 30;
    const marginBottom = 10;
    const marginLeft = 50;
    const width = containerWidth;
    const height = containerHeight;

    // Create the scales.
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(d3.sort(data, (d) => -d.frequency).map((d) => d.letter))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

    // Create a value format.
    const format = x.tickFormat(20, "%");

    // Create the SVG container.
    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 30px sans-serif;");

    // Append a rect for each letter.
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.letter))
      .attr("width", (d) => x(d.frequency) - x(0))
      .attr("height", y.bandwidth());

    // Append a label for each letter.
    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .selectAll()
      .data(data)
      .join("text")
      .attr("x", (d) => x(d.frequency))
      .attr("y", (d) => y(d.letter) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => format(d.frequency))
      .style("font-size", "12px")
      .call((text) =>
        text
          .filter((d) => x(d.frequency) - x(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );

    // Create the axes.
    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80, "%"))
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).tickSize(10)) // Adjust font size here
      .selectAll("text")
      .attr("font-size", "15px"); // Adjust y-axis text font size

    chartRef.current.appendChild(svg.node());
  };

  return (
    <div
      ref={chartRef}
      className=" h-full flex items-start"
      id="suggestion"
    ></div>
  );
};

export default HorizontalBarChart;
