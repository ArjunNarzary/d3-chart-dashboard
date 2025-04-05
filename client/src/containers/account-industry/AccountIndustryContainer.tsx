import { Card, CardContent, CardHeader, Grid } from "@mui/material"
import { getAccountIndustries } from "../../actions"
import { useApi } from "../../hooks/useApi"
import { IResponseType } from "../../interfaces"
import BarChart from "../../components/BarChart"
import ChartLoader from "../../components/ChartLoader"

export default function AccountIndustryContainer() {
  const { data, loading } = useApi<IResponseType>({
    fetchFn: getAccountIndustries,
  })

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader sx={{ textAlign: "center" }} title="Account Industry" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 6 }}>
            {loading ? <ChartLoader /> : data && <BarChart data={data} />}
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}></Grid>
          <Grid size={12}></Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
