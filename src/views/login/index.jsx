import BetweenElse from '@/components/BetweenElse'
import ContainerCenter from '@/components/ContainerCenter'
import LinkBehavior from '@/components/LinkBehavior'
import PasswordInput from '@/components/PasswordInput'
import handleSignIn from '@/utils/handle-sign-in'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const validationSchema = schema([
    { field: 'username', level: 'required' },
    { field: 'password', level: 'required' }
  ])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })
  const router = useRouter()
  const [serverError, setServerError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async data => {
    try {
      setIsLoading(true)
      await handleSignIn(data).finally(() => setIsLoading(false))
    } catch (error) {
      console.log(error)
      const errorMessage = 'Invalid credentials. Please check your username and password and try again.'
      setServerError(errorMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContainerCenter maxWidth='xs'>
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <OutlinedInput fullWidth placeholder='Username' error={!!errors.username} {...register('username')} />
                <FormHelperText error>{errors.username?.message}</FormHelperText>
              </Box>
              <Box>
                <PasswordInput placeholder='Password' name='password' register={register} errors={errors} />
                <FormHelperText error>{errors.password?.message}</FormHelperText>
              </Box>
              {serverError ? <Alert severity='error'>{serverError}</Alert> : null}
              <BetweenElse>
                <FormControlLabel
                  control={<Checkbox sx={{ p: 0, px: '9px' }} />}
                  defaultValue={false}
                  label='Remember Me'
                  {...register('rememberMe')}
                />
                <Link component={LinkBehavior} href='/forgot'>
                  Forgot Password?
                </Link>
              </BetweenElse>
              <LoadingButton loading={isLoading} type='submit' variant='contained' color='primary'>
                <span>Login</span>
              </LoadingButton>
              <Typography textAlign='center'>
                Don&lsquo;t have an account?&nbsp;
                <Link component={LinkBehavior} href='/register'>
                  Register
                </Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </ContainerCenter>
    </form>
  )
}

export default Login
