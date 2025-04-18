import React, { useEffect, useState } from "react"
import { IResponseType } from "../interfaces"
import { Card, CardContent } from "@mui/material"
import { formatCompactNumber } from "../lib/formatter"

const ClosedFiscalQuarterTable = ({
  data,
  subHeader,
}: {
  data: IResponseType
  subHeader: string
}) => {
  const [allQuarters] = useState(() => Object.keys(data)) // Save all avaible quarters
  const [types] = useState(() => {
    const curTypes = new Set<string>()
    allQuarters.forEach((q) => {
      Object.keys(data[q]).forEach((type) => curTypes.add(type))
    })
    return Array.from(curTypes)
  }) // Save all available types
  const [totalCount, setTotalCount] = useState(0) // Save total count
  const [totalACV, setTotalACV] = useState(0) // Save total ACV
  const [totalOfQuarters, setTotalOfQuarters] = useState<{
    [key: string]: { count: number; acv: number; total_percentage?: number }
  }>({}) // Total count, acv and percentage of each types

  useEffect(() => {
    const totals = types.reduce((acc, type) => {
      let count = 0
      let acv = 0
      allQuarters.forEach((q) => {
        const row = data[q][type]
        if (row) {
          count += row.total_count
          acv += row.total_acv
        }
      })
      acc[type] = { count, acv }
      return acc
    }, {} as Record<string, { count: number; acv: number }>)

    const totalCount = Object.values(totals).reduce(
      (acc, val) => acc + val.count,
      0
    )
    const totalACV = Object.values(totals).reduce(
      (acc, val) => acc + val.acv,
      0
    )
    const newTotals: {
      [key: string]: { count: number; acv: number; total_percentage?: number }
    } = totals

    Object.entries(totals).forEach(([key, value]) => {
      const percentage = ((value.acv / totalACV) * 100).toFixed(2)
      newTotals[key] = {
        ...value,
        total_percentage: parseFloat(percentage),
      }
    })

    setTotalOfQuarters(newTotals)
    setTotalCount(totalCount)
    setTotalACV(totalACV)
  }, [data, allQuarters, types])

  return (
    <Card className="overflow-auto text-sm">
      <CardContent className="p-0 overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className=" p-2 bg-white text-black">
                Closed Fiscal Quarter
              </th>
              {allQuarters.map((q, i) => (
                <th
                  className={` p-2 text-white ${
                    (i + 2) % 2 === 0 ? "bg-[#1f77b4]" : "bg-[#2290df]"
                  }`}
                  key={q}
                  colSpan={3}
                >
                  {q}
                </th>
              ))}
              <th className=" p-2 bg-[#1f77b4] text-white" colSpan={3}>
                Total
              </th>
            </tr>
            <tr>
              <th className=" p-2">{subHeader}</th>
              {allQuarters.map((q) => (
                <React.Fragment key={q}>
                  <th className=" p-2"># of Opps</th>
                  <th className=" p-2">ACV</th>
                  <th className=" p-2">% of Total</th>
                </React.Fragment>
              ))}
              <th className=" p-2"># of Opps</th>
              <th className=" p-2">ACV</th>
              <th className=" p-2">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type, index) => (
              <tr
                key={type}
                className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
              >
                <td className=" p-2 font-medium">{type}</td>
                {allQuarters.map((q) => {
                  const entry = data[q][type]
                  return (
                    <React.Fragment key={q}>
                      <td className=" p-2 text-center">
                        {entry?.total_count || 0}
                      </td>
                      <td className=" p-2 text-right">
                        {entry
                          ? `$${formatCompactNumber(entry.total_acv)}`
                          : "$0"}
                      </td>
                      <td className=" p-2 text-center">
                        {entry ? `${entry.percentage_of_count}%` : "0%"}
                      </td>
                    </React.Fragment>
                  )
                })}
                <td className=" p-2 text-center">
                  {totalOfQuarters[type]?.count}
                </td>
                <td className=" p-2 text-right">
                  ${formatCompactNumber(totalOfQuarters[type]?.acv)}
                </td>
                <td className=" p-2 text-right">
                  {totalOfQuarters[type]?.total_percentage}%
                </td>
              </tr>
            ))}
            <tr className="font-semibold bg-blue-100">
              <td className=" p-2">Total</td>
              {allQuarters.map((q) => {
                const sumCount = Object.values(data[q]).reduce(
                  (acc, val) => acc + val.total_count,
                  0
                )
                const sumACV = Object.values(data[q]).reduce(
                  (acc, val) => acc + val.total_acv,
                  0
                )
                return (
                  <React.Fragment key={q}>
                    <td className=" p-2 text-center">{sumCount}</td>
                    <td className=" p-2 text-right">
                      ${formatCompactNumber(sumACV)}
                    </td>
                    <td className=" p-2 text-center">100%</td>
                  </React.Fragment>
                )
              })}
              <td className=" p-2 text-center">{totalCount}</td>
              <td className=" p-2 text-right">
                ${formatCompactNumber(totalACV)}
              </td>
              <td className=" p-2 text-right">100%</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default ClosedFiscalQuarterTable
