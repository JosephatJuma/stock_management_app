import React, { useEffect } from "react";
import SalesTable from "./components/SalesTable";
import useSales from "../api/hooks/useSales";
import { useSelector } from "react-redux";
const Sales = () => {
  const sales = useSelector((state) => state.sales.sales);
  const { handleFetchSales } = useSales();
  useEffect(() => {
    if (Object.keys(sales).length === 0) {
      handleFetchSales();
    }
  }, []);
  return (
    <div>
      <SalesTable data={sales} />
    </div>
  );
};

export default Sales;
