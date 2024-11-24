import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { HomeCategory } from '../../../types/HomeCategoryTypes';
import HomeCategoryForm from './HomeCategoryForm';
import { useAppDispatch } from '../../../State/Store';
import { createHomeCategories } from '../../../State/customer/CustomerSlice';
import { HomeCategories } from '../../../data/HomeCategories';

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

const HomeCategoryTable = ({data}:{data:HomeCategory[]}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState<HomeCategory>();
    const handleOpen = (category:HomeCategory) => {
      setOpen(true);

      console.log("category Id: ",category);
      setCategory(category);
    }

    const handleClose = () => {
      dispatch(createHomeCategories(HomeCategories))
      setOpen(false)
    };
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((category, index) => (
                <StyledTableRow key={category.id}>
                  <StyledTableCell component="th" scope="row">
                    {index+1}
                  </StyledTableCell>
                  <StyledTableCell>{category.id}</StyledTableCell>
                  <StyledTableCell>
                    <img className='w-20 rounded-md' src={category.image} alt="" />
                  </StyledTableCell>
                  <StyledTableCell align="right">{category.categoryId}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>
                        <Edit onClick={()=>handleOpen(category)}/>
                    </Button>
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
              <HomeCategoryForm data={category}/>
          </Box>
        </Modal>
      </>
      );
}

export default HomeCategoryTable