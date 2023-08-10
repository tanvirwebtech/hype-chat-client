import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        if (userId) {
            setLoading();
        }
    }, [userId]);

    const location = useLocation();
    console.log(location);
    console.log("loading", loading);
    if (loading) {
        return (
            <>
                <div className="container mx-auto">
                    <div className="my-3 text-center">
                        <div className="">
                            <p>You must login to Enter Chat </p>
                        </div>
                        <div className="mt-2">
                            <Link to="/login">
                                <span className="text-indigo-400">
                                    Login/Register here
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (userId) {
        // authorized so return child components
        return children;
    }

    // not logged in so redirect to login page with the return url
    return <Navigate to="/" replace />;
};

export default PrivateRoute;
