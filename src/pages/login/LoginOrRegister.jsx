// import axios from "axios";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import Cookies from "js-cookie";
const LoginOrRegister = () => {
    const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
    const { username, setUsername, userId, setUserId } =
        useContext(UserContext);
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm();

    // Form Submit Handler
    const onSubmit = async (data) => {
        const url = isLoginOrRegister === "register" ? "register" : "login";
        console.log(data);
        try {
            const res = await axios.post(`/${url}`, data);
            setUsername(res.data.username);
        } catch (err) {
            console.log(err);
        }
    };

    // Logout Handler
    const handleLogout = () => {
        Cookies.remove("token");
        setUsername(null);
        setUserId(null);
    };

    if (username || userId) {
        return (
            <section>
                <div className="container mx-auto">
                    <div className="section-heading text-left md:text-center">
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
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container mx-auto">
                <div className="section-heading text-left md:text-center">
                    <h2 className="text-xl md:text-3xl font-semibold py-2 md:py-6">
                        {isLoginOrRegister === "register"
                            ? "Register"
                            : "Login"}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="login-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="my-2 lg:text-xl font-medium">
                                Please enter your info
                            </h3>
                            <div className="email mb-2 md:mb-4">
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("username")}
                                />
                            </div>
                            <div className="password mb-2 md:mb-4">
                                <input
                                    type="password"
                                    placeholder="*******"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password")}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-active btn-primary"
                            >
                                {isLoginOrRegister === "register"
                                    ? "Register"
                                    : "Login"}
                            </button>
                        </form>
                        {isLoginOrRegister === "register" && (
                            <div className="">
                                Already registered?{" "}
                                <button
                                    className="btn btn-outline"
                                    onClick={() =>
                                        setIsLoginOrRegister("login")
                                    }
                                >
                                    Login
                                </button>
                            </div>
                        )}
                        {isLoginOrRegister === "login" && (
                            <div className="">
                                New to this platform?{" "}
                                <button
                                    className="btn btn-outline py-1 px-2"
                                    onClick={() =>
                                        setIsLoginOrRegister("register")
                                    }
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2"></div>
            </div>
        </section>
    );
};

export default LoginOrRegister;
