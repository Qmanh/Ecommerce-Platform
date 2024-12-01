import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchTransactionsBySeller } from '../../../State/seller/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../../State/Store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));  

const Transaction = () => {
    const dispatch = useAppDispatch();
    const {transactions} = useAppSelector(store => store);
    useEffect(()=>{
      dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt")||""))
    },[])
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">Customer Details</StyledTableCell>
                <StyledTableCell align="right">Order</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.transactions.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.createdAt}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.customer.email}
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">{item.order.id}</StyledTableCell> */}
                  <StyledTableCell align="right">{item.order.id}</StyledTableCell>
                  <StyledTableCell align="right">{item.order.totalSellingPrice}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default Transaction