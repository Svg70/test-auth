import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/login/login';
import SignUp from './pages/sign-up/signup';
import Reset from './pages/reset/reset';
import Posts from './pages/posts/posts';
import PrivateRoute from './components/PrivateRouter';
import NotAuthRouter from './components/NotAuthRouter';


function App() {
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
