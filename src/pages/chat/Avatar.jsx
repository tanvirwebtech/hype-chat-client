// eslint-disable-next-line react/prop-types
const Avatar = ({ isOnline, name = "AB" }) => {
    return (
        <div className={`avatar placeholder ${isOnline}`}>
            <div className="bg-emerald-200 text-neutral-content rounded-full w-8 lg:w-10">
                <span className="text-base md:text-xl text-slate-800 ">
                    {name?.slice(0, 2)}
                </span>
            </div>
        </div>
    );
};

export default Avatar;
