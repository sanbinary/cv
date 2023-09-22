import VerificationWizard from '@/components/VerificationWizard'
import { addUser, checkUser, sendOTP, verifyOTP } from '@/store/user'
import handleSignIn from '@/utils/handle-sign-in'
import schema from '@/utils/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import BetweenElse from '@/components/BetweenElse'
import IndexStepRender from '@/components/IndexStepRender'
import StyledCircularProgress from '@/components/StyledCircularProgress'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const validationSchemas = [
  schema([{ field: 'username' }, { field: 'email' }]),
  schema([{ field: 'otp' }]),
  schema([{ field: 'password' }, { field: 'confirmPassword' }])
]

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(null)
  const [serverError, setServerError] = useState(null)

  const methods = useForm({ resolver: yupResolver(validationSchemas[currentStep]) })
  const dispatch = useDispatch()
  const router = useRouter()
  const { setError, setValue, getValues } = methods

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    if (serverError) {
      setServerError(null)
    }
  }, [currentStep])

  const handelCancel = () => {
    router.push(`/login`)
  }

  const handleOTPSend = async ({ email, next = null, tag = null }) => {
    try {
      if (tag) setIsLoading(tag)
      await dispatch(sendOTP({ email })).unwrap()
      if (next) next()
    } catch (error) {
      console.log(error)
      setServerError(error.data.error)
    } finally {
      if (tag) setIsLoading(null)
    }
  }

  const onSubmit = async data => {
    switch (currentStep) {
      case 0:
        const credentials = { email: data.email, username: data.username }
        try {
          setIsLoading('continue')
          await dispatch(checkUser({ ...credentials }))
            .unwrap()
            .finally(() => setIsLoading(null))
        } catch (error) {
          switch (error.status) {
            case 400:
              Object.keys(error.data).forEach(fieldName => {
                setError(fieldName, error.data[fieldName])
              })
              break
            case 409:
            case 500:
              setServerError(error.data.message)
              break
            case 404:
              handleOTPSend({ email: data.email, next: nextStep, tag: 'continue' })
              break
          }
        }
        break
      case 1:
        try {
          setIsLoading('verify')
          await dispatch(verifyOTP({ email: data.email, otp: data.otp.join('') }))
            .unwrap()
            .then(({ verificationSign }) => {
              setValue('verificationSign', verificationSign)
              nextStep()
            })
            .finally(() => setIsLoading(null))
        } catch (error) {
          setServerError(error.data.message)
        }
        break
      case 2:
        try {
          setIsLoading('register')
          await dispatch(
            addUser({
              username: data.username,
              email: data.email,
              verificationSign: data.verificationSign,
              password: data.confirmPassword
            })
          ).unwrap()
          await handleSignIn({ ...data, errorMessage: 'Something went wrong' }).finally(() => setIsLoading(null))
        } catch (error) {
          console.log(error)
          setServerError(error.data.message)
        }
      default:
        break
    }
  }

  return (
    <FormProvider {...methods}>
      <VerificationWizard currentStep={currentStep} onSubmit={onSubmit}>
        {serverError ? <Alert severity='error'>{serverError}</Alert> : null}
        <IndexStepRender stepIndex={currentStep}>
          <BetweenElse>
            <Button variant='outlined' color='secondary' onClick={handelCancel}>
              Login
            </Button>
            <Button disabled={!!isLoading} type='submit' variant='contained' color='primary'>
              {isLoading === 'continue' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Continue'}
            </Button>
          </BetweenElse>
          <BetweenElse>
            <Box>
              <Button sx={{ mr: 1 }} onClick={prevStep} variant='outlined' color='secondary'>
                Back
              </Button>
              <Button
                disabled={!!isLoading}
                variant='outlined'
                onClick={() => handleOTPSend({ email: getValues('email'), tag: 'resend' })}
                color='secondary'
              >
                {isLoading === 'resend' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Resend'}
              </Button>
            </Box>
            <Button disabled={!!isLoading} type='submit' variant='contained' color='primary'>
              {isLoading === 'verify' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Verify'}
              Verify
            </Button>
          </BetweenElse>
          <BetweenElse>
            <Button disabled={!!isLoading} type='submit' variant='contained' color='primary'>
              {!!isLoading === 'register' ? <StyledCircularProgress disabled={!!isLoading} /> : 'Register'}
            </Button>
          </BetweenElse>
        </IndexStepRender>
      </VerificationWizard>
    </FormProvider>
  )
}

export default Register
