import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import InstagramLoading from "../assets/images/instagram-loading.png";

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div className='flex justify-center items-center h-screen'><img src={InstagramLoading} alt="Loading.." /></div>;
    }

    return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PublicRoute;