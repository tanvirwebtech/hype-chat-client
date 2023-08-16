import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import LoginOrRegister from "../login/LoginOrRegister";

const Home = () => {
    const { userId } = useContext(UserContext);
    const [showWarning, setWarning] = useState(true);

    useEffect(() => {
        const getLocalStorage = localStorage.getItem("caution");
        if (getLocalStorage) {
            setWarning(false);
        }
    }, []);

    const handleCautions = () => {
        localStorage.setItem("caution", "OK");
        setWarning(false);
    };

    // Show a warning for first time user
    if (showWarning) {
        return (
            <div
                className={`container relative mx-auto h-screen flex justify-center items-center`}
            >
                <div className="warning-warp absolute  w-10/12 md:w-2/5 mx-auto  items-center p-2 bg-amber-100 border-red-500 border-[1px] rounded-md">
                    <div className="waring-head p-1">
                        <h3 className="flex items-center justify-center text-red-600 font-semibold gap-2">
                            Cautions
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                        </h3>
                    </div>
                    <div className="warning-body text-center mt-2">
                        <p>
                            This a demo or testing app, please refrain from
                            sharing sensitive or personal details in this chat
                            app. We prioritize your privacy, but messages might
                            be stored and accessed. Be cautious and avoid
                            disclosing passwords, financial data, or personal
                            info. Thank you for using our app responsibly.
                        </p>
                        <div className="">
                            <button
                                className="btn btn-secondary min-h-6 h-8 mt-2 bg-orange-600 text-gray-950 bottom-0 hover:bg-orange-400"
                                onClick={handleCautions}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="container mx-auto">
                <h2 className="lg:text-3xl md:text-xl text-base font-medium py-2 justify-center lg:mt-6 sm:mt-4 mt-2 flex items-center gap-2">
                    Welcome to Hype Chat{" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-indigo-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                    </svg>
                </h2>
                {!userId && <LoginOrRegister></LoginOrRegister>}
            </div>
        </>
    );
};

export default Home;
