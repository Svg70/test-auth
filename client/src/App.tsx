import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/login/login';
import SignUp from './pages/sign-up/signup';
import Reset from './pages/reset/reset';
import Posts from './pages/posts/posts';
import PrivateRoute from './components/PrivateRouter';
import NotAuthRouter from './components/NotAuthRouter';
import { useCookies } from "react-cookie";
import { setUser } from "./store/slices/userSlice";
import { useDispatch } from "react-redux";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();

  if (cookies.token && cookies.email && cookies.id) {
    dispatch(setUser({
      email: cookies.email,
      id: cookies.id,
      token: cookies.token,
    }));
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <Posts />
          </PrivateRoute>
        }
      />
      <Route
        path="login"
        element={
          <NotAuthRouter>
            <Login />
          </NotAuthRouter>
        } 
      />
      <Route
        path="sign-up"
        element={
          <NotAuthRouter>
            <SignUp />
          </NotAuthRouter>
        }
      />
      <Route
        path="reset"
        element={
          <NotAuthRouter>
            <Reset />
          </NotAuthRouter>  
        }
      />
    </Routes>
  );
}

export default App;
