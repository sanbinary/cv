import BetweenElse from '@/components/BetweenElse'
import { renameRecord } from '@/store/record'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useDialog } from './DialogContext'

const DialogRename = ({ id, currentFileName }) => {
  const {
    state: { rename_d },
    dispatch: localDispatch
  } = useDialog()
  const dispatch = useDispatch()
  const handleRenameDialog = () => localDispatch({ type: 'rename_d' })

  const validationSchema = schema([{ field: 'fileName' }])
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ defaultValues: { fileName: currentFileName }, resolver: yupResolver(validationSchema) })
  const onSubmit = data => {
    setIsLoading(true)
    dispatch(renameRecord({ id, fileName: data.fileName }))
      .unwrap()
      .finally(() => {
        setIsLoading(false)
        handleRenameDialog()
      })
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={rename_d} onClose={handleRenameDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <OutlinedInput
                fullWidth
                type='text'
                placeholder='Filename'
                error={!!errors.fileName}
                {...register('fileName')}
              />
              <FormHelperText error>{errors.fileName?.message}</FormHelperText>
            </Box>
            <BetweenElse>
              <Button variant='outlined' color='secondary' onClick={handleRenameDialog}>
                Cancel
              </Button>
              <LoadingButton loading={isLoading} variant='contained' type='submit'>
                <span>Rename</span>
              </LoadingButton>
            </BetweenElse>
          </Stack>
        </CardContent>
      </form>
    </Dialog>
  )
}

export default DialogRename
