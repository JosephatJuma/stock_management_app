import React, { useEffect } from "react";
import useDashboard from "../api/hooks/useDashboard";
import { useSelector } from "react-redux";
import { Summery } from "./components";
import "./styles/main-content.css";

function Home() {
  const { handleFetchDashboardData, handleFetchStats } = useDashboard();
  const { statType, stats, dashboardData } = useSelector(
    (state) => state.dashboard
  );
  useEffect(() => {
    if (Object.keys(dashboardData).length === 0) {
      handleFetchDashboardData();
    }
    if (Object.keys(stats).length === 0) {
      handleFetchStats(statType);
    }
  }, []);

  return (
    <div>
      <Summery />
    </div>
  );
}

export default Home;
