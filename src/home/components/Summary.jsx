import React from "react";
import {
  Typography,
  Box,
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./styles/summery.css";
import { setStatType } from "../../redux/slices/dashbard.slice";
import { useSelector, useDispatch } from "react-redux";
import { SummeryBarChart, SummeryPieChart, SummeryData } from "./charts";
import useDashboard from "../../api/hooks/useDashboard";
function Summary() {
  const dispatch = useDispatch();
  const { handleFetchStats } = useDashboard();
  const statType = useSelector((state) => state.dashboard.statType);

  const handleFetchStatsType = async (value) => {
    dispatch(setStatType(value));
    handleFetchStats(value);
  };
  return (
    <div>
      <SummeryData />
      <Box className="grid-container" >
        <Grid container className="graphWrapper" >
          <div className="lineGraph">
            <div className="chart-heading" style={{ padding: 10 }}>
              <Typography style={{ fontWeight: "600" }} variant="h6" textTransform={"capitalize"}>
                {statType} Sales
              </Typography>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="toggle">Stat Type</InputLabel>
                <Select
                  labelId="toggle"
                  value={statType}
                  label="Statstics"
                  onChange={(e) => handleFetchStatsType(e.target.value)}
                  //sx={{color:'#0F9D58'}}
                  size="small"
                >
                  <MenuItem value={"hourly"}>Hourly</MenuItem>
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"weekly"}>Weekly</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </div>
            <SummeryBarChart />
          </div>

          <Card
            className="pieChart"
            sx={{
              padding: 1,
            }}
          >
            <div>
            <Typography style={{ fontWeight: "600" }} textTransform={"capitalize"}>
                 Sales Pie-Chart
              </Typography>
            </div>
            <div>
              <SummeryPieChart />
            </div>
          </Card>
        </Grid>
      </Box>
    </div>
  );
}

export default Summary;
