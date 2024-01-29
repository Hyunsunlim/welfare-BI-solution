import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function MonthBar({ data }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = () => {
    const chartContainer = document.getElementById("chart-container");
    console.log("clientWidth,", chartContainer.clientWidth);
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
  }, [data, containerWidth]);

  const drawChart = () => {
    d3.select("#chart-container").html("");
    const margin = { top: 20, right: 30, bottom: 20, left: 40 };
    const legend = ["Education", "Travel", "Health"];

    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("class", "w-full h-full")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .range([0, containerWidth - margin.left - margin.right]);
    const y = d3
      .scaleLinear()
      .range([containerHeight - margin.top - margin.bottom, 0]);

    const allData = [...(data.E || []), ...(data.T || []), ...(data.H || [])];

    const color = d3
      .scaleOrdinal()
      .domain(["dataset1", "dataset2", "dataset3"])
      .range(["#2980B9", "#34495E", "#5F64B8 "]);

    x.domain(d3.extent(allData, (d) => new Date(d.date)));
    y.domain([0, d3.max(allData, (d) => d.count)]);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${containerHeight - margin.top - margin.bottom})`
      )
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b"))
      );

    svg.append("g").call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.count));

    [data.E, data.T, data.H].forEach((dataset, i) => {
      if (
        dataset &&
        Array.isArray(dataset) &&
        dataset.length > 0 &&
        dataset.every((d) => d.date)
      ) {
        svg
          .append("path")
          .datum(dataset)
          .attr("fill", "none")
          .attr("stroke", color(`dataset${i + 1}`))
          .attr("stroke-width", 3)
          .attr("d", line);

        // Add legend
        svg
          .append("text")
          .attr("x", (containerWidth * 3.5) / 5)
          .attr("y", i * 20)
          .attr("fill", color(`dataset${i + 1}`))
          .style("font-size", "12px")
          .text(`${legend[i]}`);
      }
    });
  };

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center rounded-md ">
      <h1 className="text-black h-8 flex items-center font-bold">
        Monthly Usage Status
      </h1>
      <div id="chart-container" className="w-full  h-full"></div>
    </div>
  );
}

export default MonthBar;
