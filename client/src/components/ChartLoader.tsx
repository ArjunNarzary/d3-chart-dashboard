import { Skeleton } from "@mui/material"

const ChartLoader = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-baseline">
        <Skeleton variant="rectangular" width={100} height={400} />
        <Skeleton variant="rectangular" width={100} height={200} />
        <Skeleton variant="rectangular" width={100} height={300} />
        <Skeleton variant="rectangular" width={100} height={250} />
        <Skeleton variant="rectangular" width={100} height={100} />
      </div>
      <Skeleton variant="rounded" width={600} height={40} />
    </div>
  )
}

export default ChartLoader
