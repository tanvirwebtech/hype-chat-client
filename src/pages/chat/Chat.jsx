// import React from "react";
// import "./ChatPage.css"; // Import your Tailwind CSS classes here

import { useContext, useEffect, useState } from "react";
import avatar from "../../assets/avatar-icon.png";
import { UserContext } from "./../../context/userContext";
import { useForm } from "react-hook-form";
const ChatPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedContact, setSelectedContact] = useState(null);
    const { userId } = useContext(UserContext);

    const { register, handleSubmit, reset } = useForm();
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:4040");
        setWs(ws);
        ws.addEventListener("message", handleMsg);
    }, []);

    const showPeopleOnline = (peopleData) => {
        const people = {};
        peopleData.forEach((person) => {
            people[person.userId] = person.username;
        });
        setOnlinePeople(people);
    };

    const excCurrentUser = { ...onlinePeople };
    delete excCurrentUser[userId];

    const handleMsg = (e) => {
        const msgData = JSON.parse(e.data);
        if ("online" in msgData) {
            showPeopleOnline(msgData.online);
        }
    };
    console.log(selectedContact);

    const msgSubmit = (data) => {
        const msg = data;
        const sendMsg = {
            message: {
                ...msg,
                recipient: selectedContact,
            },
        };
        console.log(sendMsg);
        ws.send(JSON.stringify(sendMsg));
        reset();
    };

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
                <div className="bg-white p-4 flex-1 overflow-y-auto mb-4">
                    {/* Chat messages */}

                    {!selectedContact && (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-xl">
                                &larr; Select a user to see conversation!
                            </p>
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
