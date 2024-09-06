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
import {
  SummeryBarChart,
  SummeryPieChart,
  SummeryData,
  ProfitSummaryChart,
} from "./charts";
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
    <Box>
      <Grid container className="main-wrapper">
        <div className="lineGraph">
          <SummeryData />
          <div
            className="chart-heading"
            style={{ padding: 10, minHeight: "100hv" }}
          >
            <Typography
              style={{ fontWeight: "600" }}
              variant="h6"
              textTransform={"capitalize"}
            >
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

        <Box
          className="pieChart"
          sx={{
            padding: 1,
          }}
        >
          <div>
            <SummeryPieChart />
          </div>
          <div>
            <ProfitSummaryChart />
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

export default Summary;
