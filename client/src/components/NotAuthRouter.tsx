import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const NotAuthRouter = ({ children }: any) => {
  const isAuthenticated = useAppSelector(state => state.user.token);

  return !isAuthenticated ? children : <Navigate to="/posts" />;
}

export default NotAuthRouter;