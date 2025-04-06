import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material"
import ChartContainer from "./containers/ChartContainer"
import { apiRoutes } from "./actions/apiRoutes"
import React from "react"

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

const App = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    // <Box component="section" className="flex flex-col gap-6 p-2 py-4">
    //   <ChartContainer
    //     title="Account Industry"
    //     apiRoute={apiRoutes.getAccountIndustries}
    //   />
    //   <ChartContainer title="ACV Range" apiRoute={apiRoutes.getAcvRange} />
    //   <ChartContainer
    //     title="Customer type"
    //     apiRoute={apiRoutes.getCustomerType}
    //   />
    //   <ChartContainer title="Teams" apiRoute={apiRoutes.getTeams} />
    // </Box>

    <Box sx={{ bgcolor: "background.paper", width: "100%", height: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="Account Industry" {...a11yProps(0)} />
          <Tab label="ACV Range" {...a11yProps(1)} />
          <Tab label="Customer type" {...a11yProps(2)} />
          <Tab label="Teams" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ChartContainer
          title="Account Industry"
          apiRoute={apiRoutes.getAccountIndustries}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChartContainer title="ACV Range" apiRoute={apiRoutes.getAcvRange} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChartContainer
          title="Customer type"
          apiRoute={apiRoutes.getCustomerType}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ChartContainer title="Teams" apiRoute={apiRoutes.getTeams} />
      </TabPanel>
    </Box>
  )
}

export default App
