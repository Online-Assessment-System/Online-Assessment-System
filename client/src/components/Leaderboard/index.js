import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Navbar from '../Home/Navbar';
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import { SERVER_URL } from '../../config/config';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
} from "mdb-react-ui-kit";

const columns = [
  { id: "rank", label: 'Rank'}, 
  { id: 'email', label: 'Username' },
  { id: 'country', label: 'Country' },
  { id: 'accuracy', label: 'Accuracy' },
  { id: 'speed', label: 'Speed\u00a0(sec)' },
];

let rows = [];


function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.rank}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const Leaderboard = () => {

  const [called, setCalled] = useState(false);

  let userData = [];

  const propogateRows = () => {
    rows = [];
    for(let id = 0;id < userData.length; id++){
      if(userData[id].accuracy==null){
        userData[id].accuracy=0;
      }
      if(userData[id].speed==null){
        userData[id].speed=0;
      }
    }
    userData.sort((a,b) => b.accuracy - a.accuracy);
    for(let id = 0; id < userData.length; id++){
      const row = {
        'rank' : id + 1,
        'email': userData[id].email.substr(0,userData[id].email.indexOf("@")),
        'country' : userData[id].country,
        'accuracy': userData[id].accuracy.toFixed(2),
        'speed': (userData[id].speed/1000).toFixed(2),
      }
      rows.push(row);
    }
  }
  

	const getData = async () => {
    if(called){
      return;
    }
		const res = await fetch(SERVER_URL + "/api/quiz/readAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    });

    const data = await res.json();
		if(data.success){
      userData = data.data;
		}else{
			toast.error(data.message, { position: "top-right" });
		}
    propogateRows();
    setCalled(true);
	};

  getData();

  return (
    <>
      <section>
        <Navbar/>
        <MDBContainer className="py-5" >
        <MDBRow>
            <MDBCol lg="12">
              <MDBCard className="mb-5">
                <Typography
                  variant="h4"
                  component="h4"
                  textAlign="center"
                  sx={{ color: "black" }}
                  pt={3}
                  pb={3}
                >
                  Leaderboard
                </Typography>
                {called && <StickyHeadTable/>}
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ToastContainer/>
      </section>
    </>
  );
};
export default Leaderboard;
