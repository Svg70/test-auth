import { Button, Card, CardActionArea, CardContent, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { СREATE_POST, GET_POSTS } from '../../dal/posts';
import { btnstyle } from '../../constants/styles';
import { useAppSelector } from '../../hooks/redux';
import { useCookies } from 'react-cookie';

interface IPost {
  title: string;
  createdAt: Date;
}

const Posts = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(removeUser());
    removeCookie('token');
    removeCookie('id');
    removeCookie('email');
  };

  const [posts, setPosts] = useState<IPost[]>([]);
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm();

  const user = useAppSelector(state => state.user);

  const [createPost] = useMutation(СREATE_POST, {   
    context: {
    headers: {
      "Authorization": user.token
    }
  }});

  const { loading, error, data } = useQuery(GET_POSTS, {variables: { getUserNotesId: user.id }});

  useEffect(() => {
    let arrayPosts = data?.getUserNotes
    if (Array.isArray(arrayPosts)) {
      setPosts(arrayPosts.map(arrayPosts.pop, [...arrayPosts]));
    }
  }, [data]);

  const [submitError, setSubmitError] = useState<string>();

  const onSubmit = (form: any) => {
    setSubmitError('');

    createPost({
      variables: {
        ...form
      }
    }).then((result) => {
      const newPost = result?.data?.createNote;
      setPosts([ newPost, ...posts ]);
      reset();
    }).catch((err) => {
      setSubmitError(`Query error`)
    })
  };

  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Posts
            </Typography>
            <Button onClick={signOut} variant="contained" color="success">Sign out</Button>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Card sx={{ maxWidth: 500, marginTop: 2, marginLeft: 'auto', marginRight: 'auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography gutterBottom variant="h6" component="div">
              Create post
            </Typography>

            <TextField 
              {...register('title', {
                required: 'Enter post, please',
                minLength: {
                  value: 5,
                  message: 'Minimal length 5 letters'
                }
              })}
              label='New Post'
              placeholder='Enter new post'
              fullWidth
              variant="standard"
            />
            <Typography color="red" height={18} fontSize={10}>
              {errors?.title && <>{errors?.title?.message || "Error"}</>}
            </Typography>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Create post</Button>
            <Typography color="red" height={18} fontSize={15}>
              {submitError}
            </Typography>
          </form>
        </CardContent>
      </Card>
      {
        Array.isArray(posts) && posts.length > 0 && posts.map((post: any, index: number) => (
          <Card sx={{ maxWidth: 500, marginTop: 2, marginLeft: 'auto', marginRight: 'auto' }} key={index}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      }
    </>
  )
}

export default Posts