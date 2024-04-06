import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Typography, Paper, Box, Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
const SummeryBarChart = () => {
  const RADIAN = Math.PI / 180;

  const radius = 10 + (100 - 10) * 0.5;
  const data = useSelector((state) => state.dashboard.stats);

  return (
    <Card sx={{ padding: 1 }}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={300} height={250} data={data}>
          <Bar dataKey="sales" fill="#0F9D58" />
          <Bar dataKey="profit" fill="#FFBB28" />
          <Bar dataKey="stock" fill="#87CEEB" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SummeryBarChart;
