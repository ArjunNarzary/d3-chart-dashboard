import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { DataItem, IResponseType } from "../interfaces"
import { formatCompactNumber } from "../lib/formatter"
import { adjustLabelYPositions } from "../lib/adjustYPosition"

const DonutChart = ({ data }: { data: IResponseType }) => {
  const ref = useRef(null)

  useEffect(() => {
    const totals: Record<string, number> = {}

    Object.values(data).forEach((quarter) => {
      Object.entries(quarter).forEach(([category, { total_acv }]) => {
        totals[category] = (totals[category] || 0) + total_acv
      })
    })

    const formattedData = Object.entries(totals).map(([key, value]) => ({
      category: key,
      value,
    }))

    const width = 600
    const height = 400
    const margin = 50
    const radius = Math.min(width, height) / 2.5 - margin

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)

    const color = d3
      .scaleOrdinal()
      .domain(formattedData.map((d) => d.category))
      .range(d3.schemeCategory10)

    const pie = d3.pie<any>().value((d) => d.value)

    const data_ready = pie(formattedData)

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)

    svg
      .selectAll()
      .data(data_ready)
      .join("path")
      .attr("d", arc as any)
      .attr("fill", (d) => color(d.data.category) as string)
      .attr("stroke", "white")
      .style("stroke-width", "2px")

    const total = d3.sum(formattedData, (d) => d.value)

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .style("font-size", "16px")
      .style("font-weight", "semi-bold")
      .text("Total")

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .style("font-size", "16px")
      .text(`$${formatCompactNumber(total)}`)

    // Outer arc for label positioning
    const outerArc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(radius * 1.4)
      .outerRadius(radius * 1.4)

    const labelPositions: [number, number][] = data_ready.map((d) => {
      const pos = outerArc.centroid(d)
      const midAngle = (d.startAngle + d.endAngle) / 2
      pos[0] = radius * 1.6 * (midAngle < Math.PI ? 1 : -1)
      return pos
    })

    const adjustedPositions = adjustLabelYPositions(labelPositions)

    // Draw polyline connecting label to arc
    svg
      .selectAll("polylines")
      .data(data_ready)
      .join("polyline")
      .attr("stroke", "gray")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", (d, i) => {
        const posA = arc.centroid(d as any)
        const posB = outerArc.centroid(d)
        const posC = [...adjustedPositions[i]]
        return [posA, posB, posC].flat().join(" ")
      })

    svg
      .selectAll("allLabels")
      .data(data_ready)
      .join("text")
      .text(
        (d) =>
          `$${formatCompactNumber(d.data.value)} (${(
            (d.data.value / total) *
            100
          ).toFixed(0)}%)`
      )
      .attr("transform", (_, i) => `translate(${adjustedPositions[i]})`)
      .style("text-anchor", (d) =>
        (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end"
      )
      .style("font-size", "12px")
  }, [data])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg ref={ref}></svg>
    </div>
  )
}

export default DonutChart
