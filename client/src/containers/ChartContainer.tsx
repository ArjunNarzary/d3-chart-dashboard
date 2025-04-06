import { Card, CardContent, CardHeader, Grid } from "@mui/material"
import { getData } from "../actions"
import { useApi } from "../hooks/useApi"
import { IResponseType } from "../interfaces"
import BarChart from "../components/BarChart"
import ChartLoader from "../components/ChartLoader"
import DonutChart from "../components/DonutChart"
import DonutLoader from "../components/DonutLoader"
import ClosedFiscalQuarterTable from "../components/ClosedFiscalQuarterTable"
import TableLoader from "../components/TableLoader"

export default function ChartContainer({
  title,
  apiRoute,
}: {
  apiRoute: string
  title: string
}) {
  const { data, loading } = useApi<IResponseType>({
    fetchFn: getData,
    args: apiRoute,
  })

  return (
    <Card sx={{ minWidth: 275, p: 2 }}>
      <CardHeader sx={{ textAlign: "center" }} title={title} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ md: 12, lg: 6 }}>
            {loading ? <ChartLoader /> : data && <BarChart data={data} />}
          </Grid>
          <Grid size={{ md: 12, lg: 6 }}>
            {loading ? <DonutLoader /> : data && <DonutChart data={data} />}
          </Grid>
          <Grid size={12}>
            {loading ? (
              <TableLoader />
            ) : (
              data && (
                <ClosedFiscalQuarterTable
                  data={data}
                  subHeader="Account Industry"
                />
              )
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
