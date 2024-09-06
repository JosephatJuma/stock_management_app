import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { Print } from "@mui/icons-material";

const ReceiptComponent = ({ items, printDisabled }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;

    // Create an iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document || iframe.contentDocument;

    // Write the content into the iframe
    iframeDoc.open();
    iframeDoc.write(`
    <html>
      <head><title>Print</title></head>
      <body>${printContents}</body>
    </html>
  `);
    iframeDoc.close();

    // Wait for the iframe content to load and then print
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe); // Clean up by removing the iframe after printing
    };
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={{ marginBottom: "1rem" }}
        disabled={printDisabled}
        endIcon={<Print />}
        style={{ backgroundColor: "#0F9D58" }}
      >
        Print Receipt
      </Button>
      <div ref={printRef}>
        <TableContainer
          component={Paper}
          style={{ marginTop: "1rem", padding: "1rem" }}
        >
          <Typography variant="h6">Summary of the Sale</Typography>
          <Table size="small" sx={{ fontSize: 10 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="right">QTY</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.product?.name}</TableCell>
                  <TableCell>{item?.product?.category?.batch?.name}</TableCell>
                  <TableCell>
                    {item?.product?.quantity - item?.quantity}
                  </TableCell>
                  <TableCell align="right">{item?.quantity}</TableCell>
                  <TableCell align="right">
                    {item?.unitPrice * item?.quantity}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Total
                </TableCell>
                <TableCell align="right">
                  {items.reduce(
                    (total, item) => total + item.unitPrice * item.quantity,
                    0
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ReceiptComponent;
