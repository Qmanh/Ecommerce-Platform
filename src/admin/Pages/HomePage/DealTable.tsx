import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteDeal, getAllDeals } from '../../../State/admin/dealSlice';
import DealForm from './DealForm';

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

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const DealTable = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState();
    const {deal} = useAppSelector(store => store);

    const handleOpen = (deal:any) => {
      setOpen(true);
      setCategory(deal);
      console.log("check check: ",deal)
    }

    const handleClose = () => {
      setOpen(false)
    };
    const handleDeleteDeal = (data:any) =>{
      console.log("delete id: ",data.id)
      dispatch(deleteDeal({ id: Number(data.id) })).then(() => {
        dispatch(getAllDeals());
    });
    }

    useEffect(()=>{
      dispatch(getAllDeals())
    },[])
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell align="right">Discount</StyledTableCell>
                <StyledTableCell align="right">Update</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deal.deals.map((item:any, index:any) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>
                    <img className="w-20 rounded-md" src={item.category.image} alt="" />
                  </StyledTableCell>
                  <StyledTableCell>{item.category.categoryId}</StyledTableCell>
                  <StyledTableCell align="right">{item.discount}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>
                        <Edit onClick={()=>handleOpen(item)}/>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton>
                        <Delete onClick={()=> handleDeleteDeal(item)} sx={{color:"red"}}/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <DealForm data={category}/>
          </Box>
        </Modal>
      </>
      );
}

export default DealTable