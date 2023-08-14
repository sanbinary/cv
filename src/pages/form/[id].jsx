import reverseFormatRecord from '@/utils/reverse-format-record'
import Form from '@/views/form'
import axios from 'axios'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'

// const extendTheme = theme =>
//   createTheme({
//     ...theme,
//     components: {
//       ...theme.components,
//       MuiCardHeader
//     }
//   })

export default ({ record }) => (

    <Form record={record} />

)

export const getServerSideProps = async ({ params, req }) => {
  const { data: record } = await axios.get(`http://localhost:3000/api/records/${params.id}`, {
    headers: {
      cookie: req.headers.cookie
    }
  })

  return {
    props: { record: reverseFormatRecord(record) }
  }
}
