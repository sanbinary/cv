import ConditionalRender from '@/components/ConditionalRender'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import ChipButton from '@/components/chipButton'
import WestRoundedIcon from '@mui/icons-material/WestRounded'
import EastRoundedIcon from '@mui/icons-material/EastRounded'

const FileName = () => {
  const { register, getValues } = useFormContext()
  const [isContentEditable, setIsContentEditable] = useState(false)
  const toggleContentEditable = () => {
    setIsContentEditable()
  }
  return (
    <Card>
      <CardContent>
        <ConditionalRender condition={isContentEditable}>
          <FormControl fullWidth>
            <OutlinedInput
              type='text'
              placeholder='Filename'
              endAdornment={
                <InputAdornment position='end'>
                  <ChipButton label={<EastRoundedIcon />} onClick={() => setIsContentEditable(false)} />
                </InputAdornment>
              }
              {...register('fileName')}
            />
          </FormControl>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            {getValues('fileName')}
            <ChipButton label={<WestRoundedIcon />} onClick={() => setIsContentEditable(true)} />
          </Stack>
        </ConditionalRender>
      </CardContent>
    </Card>
  )
}

export default FileName