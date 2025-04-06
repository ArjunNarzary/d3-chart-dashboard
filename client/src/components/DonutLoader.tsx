import { Skeleton } from "@mui/material"

const DonutLoader = () => {
  return (
    <div className="flex justify-center items-center gap-6 w-dull h-full">
      <Skeleton variant="circular" width={300} height={300} />
    </div>
  )
}

export default DonutLoader
