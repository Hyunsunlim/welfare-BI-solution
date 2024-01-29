import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
function Pie2({ dataset }) {
  const data = dataset;
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = () => {
    const chartContainer = document.getElementById("viz_container2");

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
  }, [containerWidth]);

  // drawChart 함수 따로 분리
  const drawChart = () => {
    const customColors = ["#E7B84A", "#F5E1B4 ", "#E2A10B"];

    // Create the color scale.
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.categories))
      .range(customColors);

    // Create the pie layout and arc generator.
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.total_price);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(containerWidth, containerHeight) / 2 - 1);

    const labelRadius = arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    // Remove previous chart
    d3.select("#viz_container2 svg").remove();

    // Create the SVG container.
    const svg = d3
      .select("#viz_container2")
      .append("svg")
      .attr("viewBox", [
        -containerWidth / 2,
        -containerHeight / 2,
        containerWidth,
        containerHeight,
      ])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Add a sector path for each total_price.
    svg
      .append("g")
      .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .join("path")
      .attr("fill", (d) => color(d.data.categories))
      .attr("d", arc)
      .append("title")
      .text(
        (d) =>
          `${d.data.categories}: ${d.data.total_price.toLocaleString("en-US")}`
      );

    // Create a new arc generator to place a label close to the edge.
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .style("font-size", "12px")
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.9em")
          .attr("font-weight", "bold")
          .text((d) => d.data.categories)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d) => d.data.total_price.toLocaleString("en-US"))
      );
  };

  useEffect(() => {
    // 차트를 그릴 때만 호출
    drawChart();
  }, [containerWidth]);

  return (
    <div id="viz_container2" className="w-full h-full flex items-center "></div>
  );
}

export default Pie2;
