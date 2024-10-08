import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Brush,
} from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

import { useSelector } from "react-redux";
import { Card, Grid } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ProfitSummaryChart() {
  const data = useSelector((state) => state.dashboard.stats);
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent={"center"}
      padding={"0.1rem"}
      marginTop={"0.1rem"}
    >
      <Card sx={{ padding: "0.1rem", width: "100%" }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <YAxis />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#0088FE"
              strokeWidth={2}
              // strokeDasharray="8 10"
            />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#00C49F"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#FFBB28"
              strokeWidth={2}
            />

            <XAxis dataKey="name" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            <Legend />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Grid>
  );
}
