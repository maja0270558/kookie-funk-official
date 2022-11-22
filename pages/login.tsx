import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initFirebase } from "../firebase/FirebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import classNames from "classnames";
import { ColorRing } from "react-loader-spinner";

const auth = getAuth();

initFirebase();

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    function timeout(delay: number) {
        return new Promise((res) => setTimeout(res, delay));
    }
    const emailClasses = classNames(
        "w-full border rounded px-3 py-2 text-gray-700 focus:outline-none",
        {
            ["hidden"]: user,
        }
    );

    const passwordClasses = classNames(
        "w-full border rounded px-3  py-2 text-gray-700 focus:outline-none",
        {
            ["hidden"]: user,
        }
    );

    const wrapperClasses = classNames(
        "w-full h-screen flex items-center justify-center bg-white"
    );

    if (loading) {
        return (
            <div className={wrapperClasses}>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                        "#66DC5A",
                        "#abbd81",
                        "#66DC5A",
                        "#abbd81",
                        "#66DC5A",
                    ]}
                />
            </div>
        );
    }

    if (user) {
        setTimeout(() => {
            router.push("./dashboard");
        }, 1500);
        return (
            <div className={wrapperClasses}>
                <h2 className="text-4xl text-center text-gray-600 mb-8">
                    {"🍑🫵😩🫵🍆"}
                </h2>
            </div>
        );
    }

    if (user) {
        router.push("./home");
    }

    return (
        <div className={wrapperClasses}>
            <div className="w-full md:w-1/3 rounded-lg">
                <h2 className="text-2xl text-center text-gray-600 mb-8">
                    登入
                </h2>
                <div className="px-12 pb-10">
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className={emailClasses}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <input
                                type="password"
                                placeholder="Password"
                                className={passwordClasses}
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

type LoginButtonProps = {
    email: string;
    password: string;
};

const LoginButton = (props: LoginButtonProps) => {
    const [user, loading] = useAuthState(auth);
    const loginButtonClasses = classNames(
        "w-full py-2 mt-8 rounded-full bg-[#66DC5A]  text-gray-100 focus:outline-none",
        {
            ["hidden"]: user,
        }
    );
    return (
        <button
            className={loginButtonClasses}
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
