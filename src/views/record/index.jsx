import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import EndCard from '@/components/EndCard'
import formatDateTime from '@/utils/format-date-time'

import Stack from '@mui/material/Stack'
import MenuAction from './MenuAction'
import { useSelector } from 'react-redux'

const Record = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const { records } = useSelector(state => state.record)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const rows = records.map((value, index) => ({
    _id: value._id,
    index: index + 1,
    name: `${value.intro.firstName} ${value.intro.lastName}`,
    dateCreated: formatDateTime(value.createdAt),
    dateModified: formatDateTime(value.updatedAt)
  }))

  const firstItemIndex = (page - 1) * rowsPerPage
  const lastItemIndex = firstItemIndex + rowsPerPage

  const displayedRows = rows.slice(firstItemIndex, lastItemIndex)

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Date Modified</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map(row => (
                <TableRow key={row.index}>
                  <TableCell>{row.index}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.dateCreated}</TableCell>
                  <TableCell>{row.dateModified}</TableCell>
                  <TableCell>{<MenuAction id={row._id} />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <EndCard>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant='outlined'
            shape='rounded'
          />
        </EndCard>
      </Grid>
    </Grid>
  )
}

export default Record
