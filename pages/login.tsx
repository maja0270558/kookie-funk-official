import React from "react";

const LoginButton = () => {
    return (
        <button
            type="submit"
            className="w-full py-2 mt-8 rounded-full bg-[#66DC5A]  text-gray-100 focus:outline-none"
        >
            Login
        </button>
    );
};

const login = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <form className="w-full md:w-1/3 rounded-lg">
                <h2 className="text-2xl text-center text-gray-600 mb-8">
                    Login
                </h2>
                <div className="px-12 pb-10">
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="
			  w-full
			  border
			  rounded
			  px-3
			  py-2
			  text-gray-700
			  focus:outline-none
			"
                            />
                        </div>
                    </div>
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border rounded px-3  py-2 text-gray-700 focus:outline-none"
                            />
                        </div>
                        <LoginButton />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default login;
