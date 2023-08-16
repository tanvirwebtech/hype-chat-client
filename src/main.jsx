import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./context/userContext.jsx";
import AuthProvider from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
