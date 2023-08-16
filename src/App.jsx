import axios from "axios";
import "./App.css";
import Layout from "./Layout";

const App = () => {
    axios.defaults.baseURL = "https://hype-chat-server.onrender.com";
    axios.defaults.withCredentials = true;

    return (
        <>
            <Layout></Layout>
        </>
    );
};

export default App;
