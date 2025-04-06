import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { IResponseType } from "../interfaces"
import { formatCompactNumber } from "../lib/formatter"

const BarChart = ({ data }: { data: IResponseType }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 600
    const height = 500
    const margin = { top: 60, right: 30, bottom: 100, left: 60 }

    const quarters = Object.keys(data)
    const categories = Object.keys(data[quarters[0]])

    const x = d3
      .scaleBand()
      .domain(quarters)
      .range([margin.left, width - margin.right])
      .padding(0.2)

    const maxTotal = d3.max(quarters, (q) => {
      return d3.sum(categories, (cat) => data[q][cat]?.total_acv || 0)
    })

    const y = d3
      .scaleLinear()
      .domain([0, maxTotal || 0])
      .nice()
      .range([height - margin.bottom, margin.top])

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Add horizontal grid line
    svg
      .append("g")
      .attr("class", "grid-lines")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width + margin.left)
          .tickFormat(() => "") // Hide tick labels
      )
      .selectAll("line")
      .style("stroke", "#ccc")
      .style("stroke-dasharray", "2,2") // dotted line

    // Show x-axis labels
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))

    // Show Y-axis labels
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y).tickFormat((d) => `$${formatCompactNumber(d as number)}`)
      )

    // Show bars
    quarters.forEach((quarter) => {
      let yOffset = 0
      const xPos = x(quarter) ?? 0

      const quarterTotal = d3.sum(
        categories,
        (cat) => data[quarter][cat]?.total_acv || 0
      )

      const tooltip = d3.select("#tooltip")

      // Show quarter total acv on top of the each bar
      svg
        .append("text")
        .attr("x", xPos + x.bandwidth() / 2)
        .attr("y", y(quarterTotal) - 5)
        .attr("text-anchor", "middle")
        .text(`$${formatCompactNumber(quarterTotal)}`)

      categories.forEach((cat) => {
        const val = data[quarter][cat]?.total_acv || 0
        const percentage_of_acv = data[quarter][cat]?.percentage_of_acv || 0
        const barHeight = y(0) - y(val)

        // Show each category bar
        svg
          .append("rect")
          .attr("x", xPos)
          .attr("y", y(val + yOffset))
          .attr("width", x.bandwidth())
          .attr("height", barHeight)
          .attr("fill", color(cat))
          //Add tooltip
          .on("mouseover", function () {
            tooltip.style("visibility", "visible").html(`
            <strong>Category:</strong> ${cat}<br/>
            <strong>Total ACV:</strong> $${formatCompactNumber(val)}<br/>
            <strong>Percentage:</strong> ${percentage_of_acv}%
            `)
          })
          .on("mousemove", function (event) {
            tooltip
              .style("top", event.pageY - 40 + "px")
              .style("left", event.pageX + 10 + "px")
          })
          .on("mouseout", function () {
            tooltip.style("visibility", "hidden")
          })

        /* Below code will display text inside each category bar, keep it commented as some bars are too small to display text */

        // svg
        //   .append("text")
        //   .attr("x", xPos + x.bandwidth() / 2)
        //   .attr("y", y(val / 2 + yOffset))
        //   .attr("text-anchor", "middle")
        //   .attr("dy", ".55em")
        //   .style("fill", "white")
        //   .style("font-size", "10px")
        //   .text(`$${formatCompactNumber(val)}`)
        // svg
        //   .append("text")
        //   .attr("x", xPos + x.bandwidth() / 2)
        //   .attr("y", y(val / 2 + yOffset))
        //   .attr("text-anchor", "middle")
        //   .attr("dy", "-0.5em")
        //   .style("fill", "white")
        //   .style("font-size", "10px")
        //   .text(`${percentage_of_acv}%`)

        yOffset += val
      })
    })

    // Display legend below the chart
    const legend = svg
      .selectAll(".legend")
      .data(categories)
      .enter()
      .append("g")
      .attr("transform", (_, i) => `translate(${i * 110},${height - 40})`)

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => color(d))

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .style("font-size", "12px")
      .text((d) => d)
  }, [data])

  return (
    <>
      <div
        id="tooltip"
        className="absolute bg-white  border-[1px] border-[#ccc] p-[6px] text-[12px] rounded-sm pointer-events-none shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
        style={{
          visibility: "hidden",
        }}
      ></div>
      <svg ref={svgRef} width={800} height={500}></svg>
    </>
  )
}

export default BarChart
