import { Grid, Paper, TextField, Button, Typography } from '@mui/material'
import { btnstyle, paperStyle } from '../../constants/styles'
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SIGN_UP } from '../../dal/user';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AvatarCircle from '../../components/Avatar';

export interface ISignUpForm {
  email: string;
  password: string;
  username: string;
}

const SignUp = () => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm();

  const [newUser] = useMutation(SIGN_UP);
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string>();

  const onSubmit = (data: any) => {
    setSubmitError('');

    newUser({
      variables: {
        ...data
      }
    }).then(({data}) => {
      navigate('/login')
    }).catch((err) => {
      setSubmitError('Error')
    })
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <AvatarCircle title={'Sign Up'} />
          <TextField 
            {...register('username', {
              required: 'Enter Username, please',
              minLength: {
                value: 5,
                message: 'Minimal length 5 letters'
              }
            })}
            label='Username'
            placeholder='Enter username'
            fullWidth
            variant="standard"
          />
          <Typography color="red" height={18} fontSize={10}>
            {errors?.username && <p>{errors?.username?.message || "Error"}</p>}
          </Typography>
          <TextField
            {...register('password', {
              required: 'Enter Password, please',
              minLength: {
                value: 5,
                message: 'Minimal length 5 letters'
              }
            })}
            label='Password'
            placeholder='Enter password'
            type='password'
            fullWidth
            variant="standard"
          />
          <Typography color="red" height={18} fontSize={10}>
            {errors?.password && <p>{errors?.password?.message || "Error"}</p>}
          </Typography>
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
          <Typography color="red" height={18} fontSize={10}>
            {errors?.email && <p>{errors?.email?.message || "Error"}</p>}
          </Typography>
          <Button type='submit' disabled={false} color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
          <Typography color="red" height={18} fontSize={15}>
            {submitError}
          </Typography>
          <Typography > Do you have an account ?
            <NavLink to="/login" >
                Sign In
            </NavLink>
          </Typography>
        </Paper>
      </Grid>
    </form>
  )
}

export default SignUp