import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = useAppSelector(state => !!state.user.token);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;