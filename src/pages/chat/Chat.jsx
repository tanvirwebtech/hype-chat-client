// import React from "react";
// import "./ChatPage.css"; // Import your Tailwind CSS classes here

import { useContext, useEffect, useRef, useState } from "react";
import avatar from "../../assets/avatar-icon.png";
import { UserContext } from "./../../context/userContext";

import { useForm } from "react-hook-form";
import { uniqBy } from "lodash";
import axios from "axios";

const ChatPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedContact, setSelectedContact] = useState(null);
    const { userId } = useContext(UserContext);
    const [messages, setMessages] = useState([]);

    const divUnderMessages = useRef();
    const { register, handleSubmit, reset } = useForm();
    useEffect(() => {
        connectToWebSocket();
    }, []);

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

    const showPeopleOnline = (peopleData) => {
        const people = {};
        peopleData.forEach((person) => {
            people[person.userId] = person.username;
        });
        setOnlinePeople(people);
    };

    const excCurrentUser = { ...onlinePeople };
    delete excCurrentUser[userId];

    const messagesWithOutDupes = uniqBy(messages, "id");

    const handleMsg = (e) => {
        console.log(e);
        const msgData = JSON.parse(e.data);
        if ("online" in msgData) {
            showPeopleOnline(msgData.online);
        } else {
            setMessages((prev) => [...prev, { ...msgData }]);
        }
    };
    console.log(selectedContact);

    const msgSubmit = (data) => {
        const msg = data;
        const sendMsg = {
            ...msg,
            recipient: selectedContact,
        };
        console.log(sendMsg);
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

    useEffect(() => {
        const div = divUnderMessages.current;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    useEffect(() => {
        if (selectedContact) {
            axios.get(`/messages/${selectedContact}`).then((res) => {
                const data = res.data;
                const newMsgData = data.map((msg) => ({
                    ...msg, // Copy the existing properties of the object
                    id: msg._id, // Add the "id" property with the value of "_id"
                }));
                setMessages(newMsgData);
            });
        }
    }, [selectedContact]);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-200 overflow-y-auto p-4">
                {/* Left Column - Active Chat */}
                {/* You can map through active chats here */}
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
                        <div className="avatar ml-2">
                            <div className="w-12 rounded-full">
                                <img src={avatar} />
                            </div>
                        </div>
                        <div className="p-2 rounded">{onlinePeople[id]}</div>
                    </div>
                ))}

                {/* ... More active chats */}
            </div>
            <div className="w-3/4 bg-gray-100 p-4 flex flex-col justify-between">
                {/* Right Column - Conversation */}
                <div className="bg-white p-4 flex-1   mb-4">
                    {/* Chat messages */}

                    {!selectedContact && (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-xl">
                                &larr; Select a user to see conversation!
                            </p>
                        </div>
                    )}
                    {!!selectedContact && (
                        <div className="relative h-full">
                            <div className="overflow-y-scroll absolute top-0 left-0 right-0  bottom-0">
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
                                <div className="" ref={divUnderMessages}></div>
                            </div>
                        </div>
                    )}

                    {/* ... More chat messages */}
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
                                Send
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
