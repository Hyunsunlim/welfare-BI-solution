import React, { useEffect, useState } from "react";
import * as d3 from "d3";
function Top3Bar({ dataset }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = () => {
    const chartContainer = document.getElementById("my_dataviz");
    if (chartContainer) {
      setContainerWidth(chartContainer.clientWidth);
      setContainerHeight(chartContainer.clientHeight);
      drawChart();
    }
  };

  useEffect(() => {
    // 초기 렌더링 시 크기 설정
    handleResize();
    // resize 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dataset, containerWidth]);

  const drawChart = () => {
    d3.select("#my_dataviz").select("svg").remove();
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 20, left: 40 };

    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("class", "w-full h-full")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data

    const data = dataset;

    const color = ["#34495E", "#5F64B8 ", "#2980B9"];

    // X axis
    const x = d3
      .scaleBand()
      .range([0, containerWidth - margin.left - margin.right])
      .domain(data.map((d) => d.type))
      .padding(0.7);
    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${containerHeight - margin.top - margin.bottom})`
      )
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "black");
    svg.selectAll(".domain").style("stroke", "black");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([containerHeight - margin.top - margin.bottom, 0]);
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "black");
    svg.selectAll(".tick line").style("stroke", "black");
    svg.selectAll(".domain").style("stroke", "black");

    // Bars
    svg
      .selectAll(".mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "mybar")
      .attr("x", (d) => x(d.type))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr(
        "height",
        (d) => containerHeight - margin.top - margin.bottom - y(d.count)
      )
      .attr("fill", (d, i) => color[i % color.length]);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  rounded-md">
      <h1 className="h-8 flex items-center font-bold">Top3</h1>
      <div id="my_dataviz" className=" w-full h-full"></div>
    </div>
  );
}

export default Top3Bar;
