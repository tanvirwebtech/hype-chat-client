// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

import Navbar from "./components/navbar/Navbar";
import LoginOrRegister from "./pages/login/LoginOrRegister";
import ChatPage from "./pages/chat/Chat";

const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/chat" element={<ChatPage />}></Route>
                <Route path="/login" element={<LoginOrRegister />}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Layout;
