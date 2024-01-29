import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function UsageRate({ data, chartConfig }) {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const { width, height, maxBarValue, valueFormatter } = chartConfig;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear().domain([0, maxBarValue]).range([height, 0]);

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", `${data[0].value * 100}%`)
      .style("stop-color", data[0].fill);

    gradient
      .append("stop")
      .attr("offset", `${data[0].value * 100}%`)
      .style("stop-color", "#C1CBD3");

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 45)
      .attr("width", width)
      .attr("height", height)
      .style("fill", "url(#bar-gradient)");

    svg
      .append("text")
      .text(valueFormatter(data[0].value))
      .attr("x", width / 4)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#4392D5");
  };

  return (
    <div className="flex flex-col w-full  h-full justify-center  rounded-md ">
      <h1 className="h-6 text-center flex items-center justify-center font-bold">
        Unused Ratio
      </h1>
      <div className="flex items-center justify-center w-full h-full">
        <svg
          ref={chartRef}
          width={chartConfig.width}
          height={chartConfig.height}
        ></svg>
      </div>
    </div>
  );
}

export default UsageRate;
