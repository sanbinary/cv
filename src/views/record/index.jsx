import EndCard from '@/components/EndCard'
import formatDateTime from '@/utils/format-date-time'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState, useTransition } from 'react'

import Stack from '@mui/material/Stack'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import FileName from './FileName'
import MenuAction from './DialogAction'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'

const StyledEndCard = styled(EndCard)(({ theme }) => ({
  '& .MuiBox-root': {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }
}))

const Record = () => {
  const {
    records: { count, page, page_size, results }
  } = useSelector(state => state.record)
  const [isPending, startTransition] = useTransition()
  const [nameEditableId, setNameEditableId] = useState(null)
  const theme = useTheme()
  const down_sm = useMediaQuery('(max-width: 599.95px)')

  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    router.push({ pathname: `/`, query: { page: newPage, page_size } })
  }

  const createNewRecord = () => {
    startTransition(async () => {
      const response = await axios.get(`/api/records/drafts`)
      router.push(`/form/${response.data._id}`)
    })
  }

  const rows = results.map((value, index) => ({
    _id: value._id,
    index: (page - 1) * page_size + (index + 1),
    name: value.fileName,
    dateCreated: formatDateTime(value.createdAt),
    dateModified: formatDateTime(value.updatedAt)
  }))

  return (
    <Stack spacing={2}>
      <Box display='flex' justifyContent='flex-end'>
        <Button variant='contained' onClick={createNewRecord} startIcon={<AddRoundedIcon color='white' />}>
          New Record
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Index</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Date Modified</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.index}>
                <TableCell align='center'>{row.index}</TableCell>
                <TableCell>
                  <FileName isEditable={nameEditableId === row._id} setNameEditableId={setNameEditableId}>
                    {row.name}
                  </FileName>
                </TableCell>
                <TableCell>{row.dateCreated}</TableCell>
                <TableCell>{row.dateModified}</TableCell>
                <TableCell align='center'>{<MenuAction row={row} setNameEditableId={setNameEditableId} />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledEndCard>
        <Pagination
          count={Math.ceil(count / page_size)}
          page={page}
          size={down_sm ? 'small' : 'medium'}
          onChange={handleChangePage}
          variant='outlined'
          shape='rounded'
        />
      </StyledEndCard>
    </Stack>
  )
}

export default Record
