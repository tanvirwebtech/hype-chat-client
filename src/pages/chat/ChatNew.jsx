import Avatar from "./Avatar";
import chat from "../../assets/start-chat.svg";
const ChatNew = () => {
    return (
        <section className="h-screen">
            <div className="drawer">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">{/* Page content here */}</div>
                <div className="drawer-side z-50">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                    ></label>
                    <div className="left-col w-80 bg-base-200 h-full flex flex-col justify-between">
                        <div className="left-heading m-2">
                            <h1 className="font-semibold text-base lg:text-xl flex items-center justify-center gap-1 lg:gap-2 ">
                                Contacts
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
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </h1>
                        </div>
                        <div className="left-content overflow-y-auto mx-1 mt-3 flex items-start flex-grow">
                            <ul className="w-full">
                                <li className="m-1 border-b">
                                    <div className="contact p-1 flex items-center">
                                        <Avatar isOnline={"offline"}></Avatar>
                                        <div className="details text-sm lg:text-base ml-2">
                                            <span>Name </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="left-footer px-1 py-2 border-t">
                            <div className="flex  items-center justify-center">
                                <h3 className="lg:font-medium font-normal text-sm lg:text-base">
                                    <span>Username</span>
                                </h3>
                                <button
                                    title="Logout"
                                    className="flex items-center mx-2 text-sm lg:text-base"
                                >
                                    Logout
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="lg:w-6 lg:h-6 w-4 h-4"
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
                    </div>
                </div>
            </div>
            <div className="container h-[500px] mt-6  mx-auto">
                <div className="chat-wrap p-2 w-full grid grid-cols-6 gap-2 bg-gray-100 dark:bg-inherit">
                    {/* Left Column  */}
                    <div className="lg:col-span-1 hidden md:block rounded-md border h-[500px]">
                        <div className="left-col h-full flex flex-col justify-between">
                            <div className="left-heading m-2">
                                <h1 className="font-semibold text-base lg:text-xl flex items-center justify-center gap-1 lg:gap-2">
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
                            </div>
                            <div className="left-content overflow-y-auto mx-1 mt-3 flex items-start flex-grow">
                                <ul className="w-full">
                                    <li className="m-1 border-b">
                                        <div className="contact p-1 flex items-center">
                                            <Avatar
                                                isOnline={"offline"}
                                            ></Avatar>
                                            <div className="details text-sm lg:text-base ml-2">
                                                <span>Name </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="left-footer px-1 py-2 border-t">
                                <div className="flex flex-col lg:flex-row items-center justify-center">
                                    <h3 className="lg:font-medium font-normal text-sm lg:text-base">
                                        <span>Username</span>
                                    </h3>
                                    <button
                                        title="Logout"
                                        className="flex items-center mx-2 text-sm lg:text-base"
                                    >
                                        Logout
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="lg:w-6 lg:h-6 w-4 h-4"
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
                        </div>
                    </div>
                    {/* Middle Column  */}
                    <div className="md:col-span-4 col-span-6 border h-[500px]">
                        <div className="mid-col h-full flex flex-col justify-between">
                            <div className="mid-heading m-2 flex border-b items-center md:justify-center">
                                <label
                                    htmlFor="my-drawer"
                                    className="drawer-button md:hidden"
                                >
                                    Contacts
                                </label>
                                <div className="flex justify-center flex-col flex-grow md:flex-grow-0">
                                    <h1 className="md:hidden font-semibold text-base lg:text-xl flex items-center justify-center gap-1 lg:gap-2">
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
                                    <h1 className="font-bold text-base md:text-xl flex items-center justify-center gap-2 md:py-2 py-1">
                                        Conversation
                                    </h1>
                                </div>
                            </div>
                            <div className="mid-content mx-1 mt-3 flex items-start flex-grow">
                                <div className="flex h-full items-center justify-center">
                                    <div className="">
                                        <img
                                            src={chat}
                                            alt=""
                                            className="w-2/5 mx-auto"
                                        />
                                        <p className="mt-3 text-base md:text-xl text-center">
                                            &larr; Select a user to see
                                            conversation!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mid-footer px-1 py-2 border-t">
                                <form>
                                    <div className="flex justify-between items-center">
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            className="w-full p-2 border border-gray-300 rounded"
                                            // {...register("text")}
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
                            </div>
                        </div>
                    </div>
                    {/* Right Column  */}
                    <div className="md:col-span-1 hidden md:block border h-[500px]">
                        <div className="right-col overflow-y-auto h-[500px]">
                            <p>lorem18</p>
                            <p>lorem19</p>
                            <p>lorem20</p>
                            <p>lorem8</p>
                            <p>lorem9</p>
                            <p>lorem10</p>
                            <p>lorem11</p>
                            <p>lorem12</p>
                            <p>lorem13</p>
                            <p>lorem14</p>
                            <p>lorem15</p>
                            <p>lorem16</p>
                            <p>lorem17</p>
                            <p>lorem18</p>
                            <p>lorem19</p>
                            <p>lorem20</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatNew;
