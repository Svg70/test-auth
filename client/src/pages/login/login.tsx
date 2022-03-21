import { Grid,Paper, TextField, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom'
import { LOGIN } from '../../dal/user';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import AvatarCircle from '../../components/Avatar';
import { btnstyle, paperStyle } from '../../constants/styles';
import { useCookies } from 'react-cookie';

const Login = () => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm();

  const dispatch = useDispatch();
  const [login] = useMutation(LOGIN);
  const [submitError, setSubmitError] = useState<string>();

  const [cookies, setCookie, removeCookie] = useCookies();

  const onSubmit = (data: any) => {
    setSubmitError('');

    login({
      variables: {
        ...data
      }
    }).then(({data}) => {
      dispatch(setUser({
        email: data.login.user.email,
        id: data.login.user.id,
        token: data.login.token,
      }));
      setCookie('token', data.login.token);
      setCookie('email', data.login.user.email);
      setCookie('id', data.login.user.id);
    }).catch((err) => {
      setSubmitError('Query error');
    })
  }
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <AvatarCircle title={'Sign In'} />
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
          <TextField
            {...register('password', {
              required: 'Enter password, please',
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
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
          {submitError}
          <Typography >
            <NavLink to="/reset" >
              Forgot password ?
          </NavLink>
          </Typography>
          <Typography > Do you have an account ?
            <NavLink to="/sign-up" >
              Sign Up 
          </NavLink>
          </Typography>
        </Paper>
      </Grid>
    </form>
  )
}

export default Login