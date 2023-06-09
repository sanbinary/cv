import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const PasswordInput = ({ placeholder, name, register, errors }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(() => !showPassword)

  return (
    <FormControl fullWidth variant='outlined'>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        error={!!errors[name]}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton color='primary' onClick={handleClickShowPassword} edge='end'>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        {...register(name)}
      />
    </FormControl>
  )
}

export default PasswordInput
