import { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <UserContext.Provider
            value={{
                userId,
                username,
                setUserId,
                setUsername,
                loading,
                setLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
