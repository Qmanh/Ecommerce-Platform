import React, { useEffect, useState } from 'react'
import HomeCategoryTable from '../HomeCategoryTable'
import { useAppDispatch, useAppSelector } from '../../../../State/Store'
import { getAllCategories } from '../../../../State/admin/categorySlice';
import { Box, Button, Modal, Pagination, Paper, styled, Table, TableBody,TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Edit } from '@mui/icons-material';

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

const CategoryTable3 = () => {
  const dispatch =  useAppDispatch();
  const [page, setPage] = useState(0);
  const {category} = useAppSelector(store=>store);

  const filter = { pageNumber: page,level: 3 };

  useEffect(() => {
    const currentFillter = { ...filter, pageNumber: page,level: 3 };
    dispatch(getAllCategories(currentFillter ))
  }, [])

  const handlePageChange = (value: number) => {
    setPage(value - 1);
    const newfillter = { 
      pageNumber: value - 1 ,
      level: 3
    };
    dispatch(getAllCategories(newfillter))
  }

  console.log("categoo: ",category.category)
  return (
    <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>level</StyledTableCell>
                <StyledTableCell align="right">Category Id</StyledTableCell>
                <StyledTableCell align="right">Parent Category Id</StyledTableCell>
                <StyledTableCell align="right">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.category?.map((category) => (
                <StyledTableRow key={category.id}>
                  <StyledTableCell component="th" scope="row">
                  {category.id}
                  </StyledTableCell>
                  <StyledTableCell>{category.name}</StyledTableCell>
                  <StyledTableCell>
                   {category.level}
                  </StyledTableCell>
                  <StyledTableCell align="right">{category.categoryId}</StyledTableCell>
                  <StyledTableCell align="right">{category.parentCategory?.categoryId}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>
                        <Edit/>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className='flex justify-center py-10'>
        <Pagination
          onChange={(e, value) => handlePageChange(value)}
          count={category.totalPage}
          variant="outlined"
          color="primary"
        />
      </div>

        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              
          </Box>
        </Modal> */}
      </>
      );
}

export default CategoryTable3