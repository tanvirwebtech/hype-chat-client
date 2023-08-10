// import axios from "axios";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import Cookies from "js-cookie";
import getProfile from "../../utils/getProfile";
import { useNavigate } from "react-router-dom";
import loginBanner from "../../assets/login.svg";
// import { useLocation } from "react-router-dom";
const LoginOrRegister = () => {
    //  const location = useLocation()
    const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
    const [err, setErr] = useState(null);
    const [duplicateUser, setDuplicateUser] = useState(false);
    const { username, setUsername, userId, loading, setUserId, setLoading } =
        useContext(UserContext);
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (userId && username) {
            if (seconds > 0) {
                const timer = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }, 1000);

                return () => clearInterval(timer);
            }
            if (seconds == 0) {
                returnToChat();
            }
        }
    }, [seconds, userId, username]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm();

    // Form Submit Handler
    const onSubmit = async (data) => {
        const url = isLoginOrRegister === "register" ? "register" : "login";

        setLoading(true);
        try {
            const res = await axios.post(`/${url}`, data);
            if (res.data === "ok") {
                const fetchProfile = async () => {
                    try {
                        const res = await getProfile();
                        setUserId(res.data.userId);
                        setUsername(res.data.username);
                        setLoading(false);
                        setErr(null);
                        navigate("/chat", { replace: true });
                    } catch (error) {
                        setLoading(false);
                        setErr(error);
                    }
                };
                fetchProfile();
            } else {
                console.log(res);
                setErr(res.data);
                if (res.data.includes("duplicate")) {
                    setDuplicateUser(true);
                }
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setErr(err.response.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setErr(null);
            setDuplicateUser(false);
        }, 4000);
    }, [err]);

    // Logout Handler
    const handleLogout = () => {
        Cookies.remove("token");
        setUsername(null);
        setUserId(null);
        setLoading(false);
    };

    // return to chat timer function
    const returnToChat = () => {
        if (seconds == 0) {
            navigate("/chat", { replace: true });
        }
    };

    if (username || userId) {
        return (
            <section>
                <div className="container mx-auto">
                    <div className="section-heading text-center">
                        <h2 className="text-xl md:text-3xl font-semibold py-2 md:py-6">
                            Already logged In! Username: {username}
                        </h2>
                        <div className="my-2">
                            <button
                                className="btn btn-primary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                        <div className="">
                            {username && userId ? (
                                <p>Opening chat in {seconds}</p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container mx-auto">
                <div className="section-heading text-left md:text-center">
                    <h2 className="text-center text-indigo-500 text-xl md:text-3xl font-semibold py-2 md:py-6">
                        {isLoginOrRegister === "register"
                            ? "Register"
                            : "Login"}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex justify-center">
                        <div className="login-form w-10/12 mx-auto flex flex-col justify-center">
                            {/* FORM  */}
                            <form
                                className="text-center md:text-left "
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <h3 className="my-2 lg:text-xl font-medium">
                                    Please enter your info
                                </h3>
                                <div className="email mb-2 md:mb-4">
                                    <input
                                        type="text"
                                        placeholder="username"
                                        className="input input-bordered w-full max-w-lg"
                                        {...register("username")}
                                    />
                                </div>
                                <div className="password mb-2 md:mb-4">
                                    <input
                                        type="password"
                                        placeholder="*******"
                                        className="input input-bordered w-full max-w-lg"
                                        {...register("password")}
                                    />
                                </div>
                                <div className="login-fail w-10/12 mx-auto">
                                    {err ? (
                                        <p className="text-red-500 px-2 py-1 my-1 dark:bg-red-800 bg-gray-300  bg-opacity-60 border border-red-500 rounded-md">
                                            {isLoginOrRegister} failed
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                    {duplicateUser && (
                                        <p className="text-red-500  px-2 py-1 my-1 dark:bg-red-800 bg-gray-300 bg-opacity-60 border border-red-500 rounded-md">
                                            username unavailable!
                                        </p>
                                    )}
                                </div>
                                {loading ? <p>Loading...</p> : ""}

                                {/* Submit Button   */}
                                <button
                                    type="submit"
                                    className="btn text-xs sm:text-base btn-active btn-primary py-1 px-2 min-h-6 h-6 md:min-h-8 md:h-7"
                                >
                                    {isLoginOrRegister === "register"
                                        ? "Register"
                                        : "Login"}
                                </button>
                            </form>
                            {/* FORM END  */}

                            {isLoginOrRegister === "register" && (
                                <div className="text-center my-2">
                                    Already registered?{" "}
                                    <span
                                        className="text-indigo-300 cursor-pointer py-1 px-2"
                                        onClick={() =>
                                            setIsLoginOrRegister("login")
                                        }
                                    >
                                        Login
                                    </span>
                                </div>
                            )}
                            {isLoginOrRegister === "login" && (
                                <div className="text-center my-2">
                                    New to this platform?{" "}
                                    <span
                                        className="text-indigo-300 cursor-pointer py-1 px-2"
                                        onClick={() =>
                                            setIsLoginOrRegister("register")
                                        }
                                    >
                                        Register Here
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto mb-5">
                        <div className="login-banner">
                            <img src={loginBanner} alt="Login or register" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginOrRegister;
