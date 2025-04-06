import { Card, CardContent, Skeleton } from "@mui/material"
import React from "react"

const TableLoader = () => {
  return (
    <Card className="overflow-auto text-sm">
      <CardContent className="p-0">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className=" p-2  text-center">
                <RenderSkeleton />
              </th>
              {[1, 2, 3, 4].map((_, i) => (
                <th
                  className={` p-2 text-center ${
                    (i + 2) % 2 === 0 ? "bg-[#1f77b4]" : "bg-[#2290df]"
                  }`}
                  key={i}
                  colSpan={3}
                >
                  <RenderSkeleton />
                </th>
              ))}
              <th className=" p-2 bg-[#1f77b4]" colSpan={3}>
                <RenderSkeleton />
              </th>
            </tr>
            <tr>
              <th className=" p-2">
                <RenderSkeleton />
              </th>
              {[1, 2, 3, 4].map((q) => (
                <React.Fragment key={q}>
                  <th className=" p-2">
                    <RenderSkeleton />
                  </th>
                  <th className=" p-2">
                    <RenderSkeleton />
                  </th>
                  <th className=" p-2">
                    <RenderSkeleton />
                  </th>
                </React.Fragment>
              ))}
              <th className=" p-2">
                <RenderSkeleton />
              </th>
              <th className=" p-2">
                <RenderSkeleton />
              </th>
              <th className=" p-2">
                <RenderSkeleton />
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((ele, index) => (
              <tr
                key={ele}
                className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
              >
                <td className=" p-2 font-medium">
                  <RenderSkeleton />
                </td>
                {[1, 2, 3, 4].map((q) => {
                  return (
                    <React.Fragment key={q}>
                      <td className=" p-2 text-center">
                        <RenderSkeleton />
                      </td>
                      <td className=" p-2 text-right">
                        <RenderSkeleton />
                      </td>
                      <td className=" p-2 text-center">
                        <RenderSkeleton />
                      </td>
                    </React.Fragment>
                  )
                })}
                <td className=" p-2 text-center">
                  <RenderSkeleton />
                </td>
                <td className=" p-2 text-right">
                  <RenderSkeleton />
                </td>
                <td className=" p-2 text-right">
                  <RenderSkeleton />
                </td>
              </tr>
            ))}
            <tr className="font-semibold bg-blue-100">
              <td className=" p-2">
                <RenderSkeleton />
              </td>
              {[1, 2, 3, 4].map((q) => {
                return (
                  <React.Fragment key={q}>
                    <td className=" p-2 text-center">
                      <RenderSkeleton />
                    </td>
                    <td className=" p-2 text-right">
                      <RenderSkeleton />
                    </td>
                    <td className=" p-2 text-center">
                      <RenderSkeleton />
                    </td>
                  </React.Fragment>
                )
              })}
              <td className=" p-2 text-center">
                <RenderSkeleton />
              </td>
              <td className=" p-2 text-right">
                <RenderSkeleton />
              </td>
              <td className=" p-2 text-right">
                <RenderSkeleton />
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

const RenderSkeleton = () => {
  return <Skeleton variant="text" width={60} />
}

export default TableLoader
