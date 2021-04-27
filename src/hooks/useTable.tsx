import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TableContainer,
} from "@material-ui/core";
import React, { useState } from 'react';

const useStyles = makeStyles(theme => {

  const palette = theme.palette

  return ({
    table: {
      minWidth: 600,
      overflow: 'auto',
      '& thead th': {
        fontWeight: '600',
        color: palette.secondary.dark,
        backgroundColor: palette.common.white,
        borderBottom: 'none',
        '&:last-child': {
          borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`
        }
      },
      '& thead th:nth-child(1)': {
        borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`
      },
      '& tbody td': {
        fontWeight: '400'
      },
      '& tbody tr:hover': {
        cursor: 'pointer',
        backgroundColor: palette.background.default
      }
    }
  })
});

// Types
interface UseTableTypes {
  records: any[]
  headCells: {
    id: string,
    label: string,
    disableSorting?: boolean
  }[],
  filterFN: {
    fn: (...args: any) => any
  }
}

const useTable = ({ records, headCells, filterFN }: UseTableTypes) => {

  const styles = useStyles();

  const pages = [5, 10, 15, 30, 60, 120, records.length]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props: any) => (
    <TableContainer style={{ width: '100%', maxHeight: '62vh' }} component="div" >
      <Table className={styles.table} stickyHeader >
        {props.children}
      </Table>
    </TableContainer>
  )

  const TblHead = () => {

    const handleSortRequest = (cellId: any) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }

    return (
      <TableHead>
        <TableRow>
          {
            headCells.map(headCell => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {
                  headCell.disableSorting ? headCell.label :
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => { handleSortRequest(headCell.id) }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                }
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(target.value, 10));
    setPage(0);
  }

  const TblPagination = () => (
    <TablePagination
      component="div"
      rowsPerPageOptions={pages}
      page={page}
      count={records.length}
      rowsPerPage={rowsPerPage}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )

  const sort = (array: any[], comparator: any) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: any, orderBy: any) {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }
  const recordsAfterPagingAndSorting = () => {
    return sort(filterFN.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}

export default useTable;