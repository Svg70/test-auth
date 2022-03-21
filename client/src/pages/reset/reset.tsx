import React, { useState } from 'react'
import { Grid,Paper, TextField, Button, Typography } from '@mui/material'
import { btnstyle, paperStyle } from '../../constants/styles'
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { CHANGE_PASS } from '../../dal/user';

const Reset = () => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm();

  const [changePass] = useMutation(CHANGE_PASS);
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string>();

  const onSubmit = (data: any) => {
    console.log(data, 'REQ')
    setSubmitError('');

    changePass({
      variables: {
        ...data
      }
    }).then(({data}) => {
      navigate('/login')
    }).catch((err) => {
      //setSubmitError(`Error - ${err[0]?.message}`)
      setSubmitError(`Error`)
    })
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <h2>Reset</h2>
          </Grid>
          <TextField
            {...register('email', {
              required: 'Enter Email, please',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
            label='Email'
            placeholder='Enter email'
            fullWidth
            variant="standard"
          />
          <TextField
            {...register('newPassword', {
              required: 'Enter New Password, please',
              minLength: {
                value: 5,
                message: 'Minimal length 5 letters'
              }
            })}
            label='New Password'
            placeholder='Enter new password'
            type='password'
            fullWidth
            variant="standard"
          />
          <TextField
            {...register('repeatNewPassword', {
              required: 'Repeat New Password, please',
              minLength: {
                value: 5,
                message: 'Minimal length 5 letters'
              }
            })}
            label='Repeat New Password'
            placeholder='Repaet new password'
            type='password'
            fullWidth
            variant="standard"
          />
          <Button type="submit" color='primary' variant="contained" style={btnstyle} fullWidth>Reset</Button>
          <Typography color="red" height={20} fontSize={15}>
            {submitError}
          </Typography>
          
          <Typography > Do you have an account ?
            <NavLink to="/sign-up" >
              Sign up
            </NavLink>
          </Typography>
        </Paper>
      </Grid>
    </form>
  )
}

export default Reset