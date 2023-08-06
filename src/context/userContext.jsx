import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        axios
            .get("/profile")
            .then((res) => {
                console.log(res);
                setUsername(res.data.username);
                setUserId(res.data.userId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <UserContext.Provider
            value={{ userId, username, setUserId, setUsername }}
        >
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
