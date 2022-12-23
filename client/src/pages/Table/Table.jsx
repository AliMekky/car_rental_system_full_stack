import React from "react";
import "./Table.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
function Table() {
  const location = useLocation();
  const input = location.state.info;
  const name = location.state.title;
  //   console.log(location.state.info);
  var keys = Object.keys(input[0]);
  console.log(keys);
  console.log(input);
  console.log(name);
  for (let i = 0; i < input.length; i++) {
    input[i] = Object.assign({ id: i }, input[i]);
  }

  var columns = [];
  for (let i = 0; i < keys.length; i++) {
    columns.push({ field: keys[i], headerName: keys[i], width: 150 });
  }
  console.log(columns);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>{name}</h1>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={input}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
          Toolbar: CustomToolbar,
        }}
        />
      </Box>
    </div>
  );
}

export default Table;
