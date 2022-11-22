import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { text } from "stream/consumers";
import { initFirebase } from "../firebase/FirebaseApp";

const auth = getAuth();

type LoginButtonProps = {
    email: string;
    password: string;
};

const LoginButton = (props: LoginButtonProps) => {
    return (
        <button
            className="w-full py-2 mt-8 rounded-full bg-[#66DC5A]  text-gray-100 focus:outline-none"
            onClick={() => {
                signInWithEmailAndPassword(auth, props.email, props.password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log(user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error);
                    });
            }}
        >
            Login
        </button>
    );
};

const login = () => {
    initFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <div className="w-full md:w-1/3 rounded-lg">
                <h2 className="text-2xl text-center text-gray-600 mb-8">
                    Login {email} {password}
                </h2>
                <div className="px-12 pb-10">
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border rounded px-3  py-2 text-gray-700 focus:outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <LoginButton email={email} password={password} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
