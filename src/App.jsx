import axios from "axios";
import "./App.css";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import getProfile from "./utils/getProfile";

const App = () => {
    axios.defaults.baseURL = "http://localhost:4040";
    axios.defaults.withCredentials = true;
    const { setLoading, setUserId, setUsername } = useContext(UserContext);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await getProfile();
                setUserId(res.data.userId);
                setUsername(res.data.username);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return (
        <>
            <Layout></Layout>
        </>
    );
};

export default App;
