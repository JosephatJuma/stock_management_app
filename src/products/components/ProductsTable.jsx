import * as React from "react";
import { Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import {
  TableContainer,
  TableHead,
  TablePagination,
  Button,
} from "@mui/material";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import {
  MoreVert,
  Search,
  Edit,
  Delete,
  Error,
  Clear,
  Visibility,
  OpenInNew,
  Add,
} from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  toggleShowEditProductModal,
  setSelectedProduct,
} from "../../redux/slices/products.slice";
import { useNavigate } from "react-router-dom";

function ProductsTable({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterQuery, setFilterQuery] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    //update global state for selected products
    dispatch(setSelectedProduct(product));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewproducts = () => {
    setAnchorEl(null);
    dispatch(openproducts());
  };
  const selectproducts = () => {
    // navigate(`/admin/dashboard/product/${selectedProduct.id}`);
  };
  const editproducts = () => {
    setAnchorEl(null);
    dispatch(toggleShowEditProductModal());
  };

  const deleteproducts = () => {
    setAnchorEl(null);
    // dispatch(toggleOpenDelete());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "id", label: "Id" },
    { id: "name", label: "Name", minWidth: 40 },
    { id: "category", label: "Category", minWidth: 40 },
    { id: "batch", label: "Batch", minWidth: 40 },
    { id: "quantity", label: "QTY" },
    { id: "unitPrice", label: "Unit Price (UGX)", minWidth: 40 },
    { id: "totalPrice", label: "Total Price (UGX)", minWidth: 40 },
    { id: "expiryDate", label: "Expires", minWidth: 40 },
    {
      id: "action",
      label: "Action",
      minWidth: 20,
      cellRenderer: (row) => (
        <IconButton
          size="small"
          aria-controls={anchorEl ? "action-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? "true" : undefined}
          disableElevation
          onClick={(e) => handleOpen(e, row)}
        >
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  function createData(id, name, quantity, cat, unitPrice, expDate) {
    const totalPrice = quantity * unitPrice;
    const expiryDate = dayjs(expDate).format("MMMM D, YYYY");
    const category = cat?.name;
    const batch = cat?.batch?.name;
    return {
      id,
      name,
      quantity,
      category,
      batch,
      unitPrice,
      totalPrice,
      expiryDate,
    };
  }

  const rows = data.map((item) =>
    createData(
      item?.id,
      item?.name,
      item?.quantity,
      item?.category,
      item?.unitPrice,
      item?.expDate
    )
  );

  const filteredRows = rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      row.category.toLowerCase().includes(filterQuery.toLowerCase())
      //row.modularity.toLowerCase().includes(filterQuery.toLowerCase())
      //row.productsTuition.toLowerCase().includes(filterQuery.toLowerCase()) ||
      //row.duration.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });
  return (
    <Paper sx={{ width: "100%", overflow: "scroll", borderRadius: 2 }}>
      <Paper
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
      </Paper>
      <TableContainer sx={{ maxHeight: 440, overflowBlock: "auto" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size={"small"}
          sx={{ overflowBlock: "auto" }}
        >
          <TableHead>
            <TableRow hover role="checkbox" tabIndex={-1}>
              {columns
                .filter(
                  (column) => column.id !== "description" && column.id !== "id"
                )
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Error /> No data
                </TableCell>
              </TableRow>
            ) : (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "description" || column.id === "id") {
                          return null; // Skip rendering the column with id "description"
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action"
                              ? column.cellRenderer(row)
                              : column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={deleteproducts}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
        <MenuItem onClick={editproducts}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={viewproducts}>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          View
        </MenuItem>
        <MenuItem onClick={selectproducts}>
          <ListItemIcon>
            <OpenInNew />
          </ListItemIcon>
          More
        </MenuItem>
      </Menu>
    </Paper>
  );
}

export default ProductsTable;
