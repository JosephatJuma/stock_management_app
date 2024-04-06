import * as React from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { Collapse, Button, Typography, Chip } from "@mui/material";
import {
  OpenInNew,
  KeyboardArrowDown,
  KeyboardArrowUp,
  CalendarMonth,
  Percent,
} from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// import {
//   openproducts,
//   setselectedProduct,
//   toggleEditproducts,
// } from "../../../redux/slices/productSlice";
// import { toggleOpenDelete } from "../../../redux/slices/itemSlice";
import { useNavigate } from "react-router-dom";

function SalesTable({ data }) {
  const [filterQuery, setFilterQuery] = React.useState("");

  function createData(id, customerName, refNo, date, totalAmount, items) {
    return {
      id,
      customerName,
      refNo,
      date,
      totalAmount,
      items,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id.slice(0, 8).toUpperCase()}
          </TableCell>
          <TableCell align="left">{row?.customerName}</TableCell>

          <TableCell align="right">
            {dayjs(row?.date).format("MMM D, YYYY HH:MM:ss")}
          </TableCell>
          <TableCell align="right">{row?.totalAmount || "__"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Chip
                    gutterBottom
                    component="div"
                    label={`Reference: ${row.refNo}`}
                  />
                  <Chip
                    gutterBottom
                    component="div"
                    label={`Total Items Sold: ${row.items.length}`}
                    icon={<Percent />}
                  />
                  <Chip
                    gutterBottom
                    component="div"
                    label={`Date Sold: ${dayjs(row?.date).format(
                      "MMMM D, YYYY HH:MM:ss"
                    )}`}
                    icon={<CalendarMonth />}
                  />
                </div>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product(s)</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Total Price (UGX)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items.map((itemsRow) => (
                      <TableRow key={itemsRow?.id}>
                        <TableCell>{itemsRow?.product?.name}</TableCell>
                        <TableCell align="right">
                          {itemsRow?.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {itemsRow?.unitPrice}
                        </TableCell>
                        <TableCell align="right">
                          {itemsRow?.totalPrice}
                        </TableCell>
                        {/* <TableCell align="right">
                          {Math.round(itemsRow.quantity * row.unitPrice * 100) /
                            100}
                        </TableCell> */}
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell scope="row" align="left">
                        <Typography sx={{ fontWeight: "bold" }}>
                          Total:
                        </Typography>
                      </TableCell>
                      <TableCell scope="row" align="right" colSpan={3}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {row.totalAmount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* <Button
                  endIcon={<OpenInNew />}
                  variant="contained"
                  sx={{
                    backgroundColor: "#0F9D58",
                    margin: 1,
                    ":hover": { backgroundColor: "#0F9D58c0" },
                  }}
                >
                  Details
                </Button> */}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const rows = data.map((item) =>
    createData(
      item.id,
      item.customerName,
      item.refNo,
      item.date,
      item.totalAmount,
      item.items
    )
  );

  const filteredRows = rows.filter((row) => {
    return (
      row.customerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      row.date.toLowerCase().includes(filterQuery.toLowerCase())
      //row.modularity.toLowerCase().includes(filterQuery.toLowerCase())
      //row.productsTuition.toLowerCase().includes(filterQuery.toLowerCase()) ||
      //row.duration.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });
  return (
    <Paper sx={{ width: "100%", overflow: "scroll", borderRadius: 2 }}>
      {/* <Paper
        style={{
          alignSelf: "auto",
          display: "flex",
          alignItems: "center",
          padding: 5,
          backgroundColor: "#0F9D58",
          color: "#fff",
        }}
      >
        <Search />
        <InputBase
          sx={{ ml: 2, flex: 1, color: "#fff" }}
          placeholder="Filter Products"
          inputProps={{ "aria-label": "search products " }}
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px", alignSelf: "flex-end" }}
          aria-label="search"
          disabled={!filterQuery}
          onClick={() => setFilterQuery("")}
        >
          <Clear />
        </IconButton>
        <Button
          sx={{
            backgroundColor: "#0F9D58",
            ":hover": { backgroundColor: "#0F9D58c0" },
          }}
          endIcon={<Add />}
          variant="contained"
        >
          Add
        </Button>
      </Paper> */}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Sale ID</TableCell>
              <TableCell>Customer</TableCell>
              {/* <TableCell align="right">Refrence Number</TableCell> */}
              <TableCell align="right">Date Sold</TableCell>
              <TableCell align="right">Total Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default SalesTable;
