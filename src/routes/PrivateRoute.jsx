// import { UserContext } from "../context/userContext";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { userId, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <>
                <div className="w-full h-ful flex items-center justify-center">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </>
        );
    }

    if (!userId) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
