import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Text,
} from "recharts";
import { useSelector } from "react-redux";
import { Card, Grid } from "@mui/material";
const SummeryPieChart = () => {
  // const data = [
  //   { name: "January", sales: 400 },
  //   { name: "February", sales: 300 },
  //   { name: "March", sales: 300 },
  //   { name: "April", sales: 200 },
  //   { name: "May", sales: 200 },
  //   { name: "June", sales: 800 },
  // ];

  const { stats, statType } = useSelector((state) => state.dashboard);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const COLORS = [
    "purple",
    "#87CEEB",
    "#FFBB28",
    "#0F9D58",
    "#000080",
    "#0088FE",
    "#FF8042",
  ];
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent={"center"}
      padding={"0.1rem"}
    >
      <Card
        sx={{
          padding: "0.1rem",
          width: "100%",
        }}
      >
        <Text
          x={0}
          y={0}
          dx={10}
          dy={10}
          fontSize={14}
          fontWeight="bold"
          style={{ textTransform: "capitalize" }}
        >
          {statType} sales pie chart
        </Text>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={stats}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="sales"
            >
              {stats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Sector />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Grid>
  );
};

export default SummeryPieChart;
