import ChipButton from '@/components/ChipButton'
import AddRounded from '@mui/icons-material/AddRounded'
import RemoveRounded from '@mui/icons-material/RemoveRounded'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
// import CardActionHeader from './components/cardActionHeader'
import CardFieldArray from '@/components/CardFieldArray'
import { FileDownloadOffSharp } from '@mui/icons-material'
import InputErrorHelper from '@/components/InputErrorHelper'

const Extras = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext()
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'extras'
  })
  return (
    <CardFieldArray
      title='Extras'
      action={<ChipButton label={<AddRounded />} onClick={() => append('')} />}
      fields={fields}
    >
      {fields.length > 0 && (
        <CardContent>
          <Grid container spacing={2}>
            {fields.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputErrorHelper errorMessage={errors?.extras?.[index]?.value?.message}>
                        <OutlinedInput
                          error={!!errors?.extras?.[index]?.value?.message}
                          fullWidth
                          type='text'
                          placeholder='Extra'
                          endAdornment={
                            <InputAdornment position='end'>
                              <ChipButton label={<RemoveRounded />} onClick={() => remove(index)} />
                            </InputAdornment>
                          }
                          {...register(`extras.${index}.value`)}
                        />
                      </InputErrorHelper>
                    </FormControl>
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        </CardContent>
      )}
    </CardFieldArray>
  )
}

export default Extras
