// import React from "react";
// import "./ChatPage.css"; // Import your Tailwind CSS classes here

import { useContext, useEffect, useRef, useState } from "react";
import avatar from "../../assets/avatar-icon.png";
import { UserContext } from "./../../context/userContext";
import { useForm } from "react-hook-form";
import { uniqBy } from "lodash";
import axios from "axios";
import Cookies from "js-cookie";

const ChatPage = () => {
    // STATES
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [offlinePeople, setOfflinePeople] = useState({});
    const [selectedContact, setSelectedContact] = useState(null);
    const { userId, setUsername, setLoading, setUserId, loading } =
        useContext(UserContext);
    const [messages, setMessages] = useState([]);

    const divUnderMessages = useRef();
    const { register, handleSubmit, reset } = useForm();

    // SIDE EFFECTS
    useEffect(() => {
        connectToWebSocket();
    }, []);

    // Web socket server connecting function
    const connectToWebSocket = () => {
        const ws = new WebSocket("ws://localhost:4040");
        setWs(ws);
        ws.addEventListener("message", handleMsg);
        ws.addEventListener("close", () => {
            setTimeout(() => {
                connectToWebSocket();
                console.log("trying to re-connect");
            }, 1000);
        });
    };

    // Scroll chat
    useEffect(() => {
        const div = divUnderMessages.current;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    // Retrieve messages from DB
    useEffect(() => {
        if (selectedContact) {
            setLoading(true);
            setMessages([]);
            axios.get(`/messages/${selectedContact}`).then((res) => {
                const data = res.data;
                const newMsgData = data.map((msg) => ({
                    ...msg,
                    id: msg._id,
                }));
                setMessages(newMsgData);
                setLoading(false);
            });
        }
    }, [selectedContact]);

    // Get offline users
    useEffect(() => {
        setLoading(true);
        axios.get("/offlineUsers").then((res) => {
            const users = res.data;
            const offlineUsersArr = users
                .filter((user) => user._id !== userId)
                .filter(
                    (user) => !Object.keys(onlinePeople).includes(user._id)
                );
            const people = {};
            offlineUsersArr.forEach(
                (user) => (people[user._id] = user.username)
            );
            setOfflinePeople(people);
            setLoading(false);
        });
    }, [onlinePeople]);

    const showPeopleOnline = (peopleData) => {
        const people = {};
        peopleData.forEach((person) => {
            people[person.userId] = person.username;
        });
        setOnlinePeople(people);
    };

    // showing online users except our user
    const excCurrentUser = { ...onlinePeople };
    delete excCurrentUser[userId];

    const messagesWithOutDupes = uniqBy(messages, "id"); // Prevent duplicate event or messages

    // Incoming Messages Handler
    const handleMsg = (e) => {
        const msgData = JSON.parse(e.data);
        if ("online" in msgData) {
            showPeopleOnline(msgData.online);
        } else {
            setMessages((prev) => [...prev, { ...msgData }]);
        }
    };

    // Message Send Handler
    const msgSubmit = (data) => {
        const msg = data;
        const sendMsg = {
            ...msg,
            recipient: selectedContact,
        };

        // sending to web socket
        ws.send(JSON.stringify(sendMsg));
        setMessages((prev) => [
            ...prev,
            {
                text: msg.text,
                sender: userId,
                recipient: selectedContact,
                id: Date.now(),
            },
        ]);

        reset();
    };

    // Logout Handler
    const handleLogout = () => {
        Cookies.remove("token");
        setUsername(null);
        setUserId(null);
        setWs(null);
        setLoading(false);
        console.log("load false");
    };

    return (
        <div>
            <div className="drawer z-40 ">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content h-4">
                    <label
                        htmlFor="my-drawer"
                        className="btn text-sm min-h-6 h-7
                         px-2 m-2 btn-primary drawer-button md:hidden"
                    >
                        &larr; Chats
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu relative flex-nowrap p-4 w-60 h-full overflow-y-scroll bg-base-200 text-base-content">
                        <div className="sticky -top-4 bg-base-200 z-50 w-full py-3">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-base flex items-center justify-center gap-2">
                                    Hype Chat
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                                        />
                                    </svg>
                                </h1>
                                <button onClick={handleLogout} title="Logout">
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
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {Object.keys(excCurrentUser).map((id) => (
                            <li key={id}>
                                <div
                                    className={
                                        " flex items-center border border-white gap-2 p-1 my-2 relative cursor-pointer " +
                                        (selectedContact === id
                                            ? "bg-white before:absolute before:contents[''] before:w-2 before:h-full before:bg-blue-500 before:left-0 before:rounded-e-md"
                                            : "")
                                    }
                                    onClick={() => setSelectedContact(id)}
                                >
                                    <div className="avatar ml-2 relative">
                                        <div className="w-12 rounded-full ">
                                            <img src={avatar} />
                                        </div>
                                        <div className="absolute w-3 h-3 rounded-full border-2 border-white bg-green-500 bottom-0 right-0 z-10"></div>
                                    </div>
                                    <div className="p-2 rounded">
                                        {onlinePeople[id]}
                                    </div>
                                </div>
                            </li>
                        ))}
                        {Object.keys(offlinePeople).map((id) => (
                            <li key={id}>
                                <div
                                    className={
                                        "flex items-center border border-white gap-2 p-1 my-2 relative cursor-pointer " +
                                        (selectedContact === id
                                            ? "bg-white before:absolute before:contents[''] before:w-2 before:h-full before:bg-blue-500 before:left-0 before:rounded-e-md"
                                            : "")
                                    }
                                    onClick={() => setSelectedContact(id)}
                                >
                                    <div className="avatar relative ml-2">
                                        <div className="w-12 rounded-full">
                                            <img src={avatar} />
                                        </div>
                                        <div className="absolute w-3 h-3 rounded-full border-2 border-white bg-gray-400 bottom-0 right-0 z-10"></div>
                                    </div>
                                    <div className="p-2 rounded">
                                        {offlinePeople[id]}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex h-screen">
                <div className="w-1/4 bg-gray-200 p-4 flex-grow relative md:block hidden">
                    {/* Left Column - USERS */}
                    <div className="sticky top-0 z-30 bg-gray-200 border-b-[1px] border-gray-800 py-2">
                        <h1 className="font-bold text-2xl flex items-center justify-center gap-2">
                            Hype Chat
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                                />
                            </svg>
                        </h1>
                    </div>
                    <div className="users max-h-screen h-[500px] overflow-y-scroll">
                        {Object.keys(excCurrentUser).map((id) => (
                            <div
                                key={id}
                                className={
                                    "flex items-center border border-white gap-2 p-1 my-2 relative cursor-pointer " +
                                    (selectedContact === id
                                        ? "bg-white before:absolute before:contents[''] before:w-2 before:h-full before:bg-blue-500 before:left-0 before:rounded-e-md"
                                        : "")
                                }
                                onClick={() => setSelectedContact(id)}
                            >
                                <div className="avatar ml-2 relative">
                                    <div className="w-12 rounded-full ">
                                        <img src={avatar} />
                                    </div>
                                    <div className="absolute w-3 h-3 rounded-full border-2 border-white bg-green-500 bottom-0 right-0 z-10"></div>
                                </div>
                                <div className="p-2 rounded">
                                    {onlinePeople[id]}
                                </div>
                            </div>
                        ))}
                        {Object.keys(offlinePeople).map((id) => (
                            <div
                                key={id}
                                className={
                                    "flex items-center border border-white gap-2 p-1 my-2 relative cursor-pointer " +
                                    (selectedContact === id
                                        ? "bg-white before:absolute before:contents[''] before:w-2 before:h-full before:bg-blue-500 before:left-0 before:rounded-e-md"
                                        : "")
                                }
                                onClick={() => setSelectedContact(id)}
                            >
                                <div className="avatar relative ml-2">
                                    <div className="w-12 rounded-full">
                                        <img src={avatar} />
                                    </div>
                                    <div className="absolute w-3 h-3 rounded-full border-2 border-white bg-gray-400 bottom-0 right-0 z-10"></div>
                                </div>
                                <div className="p-2 rounded">
                                    {offlinePeople[id]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="bg-gray-500 h-[2px]" />
                    <div className="logout my-2 flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="py-1 px-2 flex items-center gap-1 bg-indigo-500 text-white font-medium rounded-md"
                        >
                            Logout{" "}
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
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-3/4 bg-gray-100 p-4 relative flex flex-col justify-between">
                    {/* Right Column - Conversation */}
                    <div className="bg-white relative p-4 flex-1 mb-4">
                        <div className="fixed py-2 text-center  mx-auto z-30 bg-slate-200 w-full md:w-3/4 right-0 top-0">
                            <span className="text-base md:text-2xl font-medium">
                                Conversation
                            </span>
                        </div>
                        {/* Chat messages */}
                        {!selectedContact && (
                            <div className="flex h-full items-center justify-center">
                                <p className="text-base md:text-xl">
                                    &larr; Select a user to see conversation!
                                </p>
                            </div>
                        )}
                        {!!selectedContact && (
                            <div className="relative h-full">
                                <div className="overflow-y-scroll absolute top-0 left-0 right-0  bottom-0">
                                    {loading ? (
                                        <div className="w-full h-ful flex items-center justify-center">
                                            <span className="loading loading-ring loading-lg"></span>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {messagesWithOutDupes.map((msg) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <div className="" key={msg.id}>
                                            <div
                                                className={
                                                    msg.sender === userId
                                                        ? "text-right"
                                                        : "text-left"
                                                }
                                            >
                                                <div
                                                    className={
                                                        "inline-block text-left p-2 m-1 rounded-md text-sm " +
                                                        (msg.sender === userId
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-slate-200 text-gray-600")
                                                    }
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        className=""
                                        ref={divUnderMessages}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {!!selectedContact && (
                        <form onSubmit={handleSubmit(msgSubmit)}>
                            <div className="flex justify-between items-center">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="w-full p-2 border border-gray-300 rounded"
                                    {...register("text")}
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
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
                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
