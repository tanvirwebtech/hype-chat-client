import axios from "axios";
import "./App.css";
import Layout from "./Layout";
import UserContextProvider from "./context/userContext";

function App() {
    axios.defaults.baseURL = "http://localhost:4040";
    axios.defaults.withCredentials = true;
    return (
        <>
            <UserContextProvider>
                <Layout></Layout>
            </UserContextProvider>
        </>
    );
}

export default App;
