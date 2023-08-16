// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";

import LoginOrRegister from "./pages/login/LoginOrRegister";
import ChatPage from "./pages/chat/Chat";
import PrivateRoute from "./routes/PrivateRoute";

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>

                <Route path="/login" element={<LoginOrRegister />}></Route>
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <ChatPage />
                        </PrivateRoute>
                    }
                ></Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default Layout;
