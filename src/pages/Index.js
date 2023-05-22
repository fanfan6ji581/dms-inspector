import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const IndexPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default IndexPage;
