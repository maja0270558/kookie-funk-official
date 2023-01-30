import React from "react";
import Image from "next/image";

const home = () => {
    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row  place-content-center min-h-[95vh]">
                <div className="flex flex-col lg:flex-row-reverse flex-1 ">
                    <div className="relative flex flex-auto justify-center min-w-[368] lg:max-w-[50%]">
                        {
                            <Image
                                alt=""
                                // src={"/profile.jpg"}
                                src={"/profile.jpg"}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="object-contain lg:object-contain w-auto h-auto aspect-auto"
                            />
                        }
                    </div>

                    <div className="flex lg:flex-1 pt-4 items-end justify-center">
                        <div className="flex">
                            <div className="grow-1 text-base-content prose-sm lg:prose-lg  lg:pb-8">
                                <h1 className="text-3xl font-bold text-center lg:text-left">
                                    曲奇放克
                                </h1>
                                <p className="">台灣人｜A型</p>
                                <p className="">
                                    業務範圍包括但不限於 ：<br></br> 插畫 / 動畫
                                    / 繪畫教學 / Youtube相關
                                </p>
                                <p className="">
                                    歡迎各種合作來信詢問 。<br></br>{" "}
                                    a88115146@gmail.com
                                </p>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="flex items-center justify-center gap-1 flex-col lg:flex-row-reverse bg-slate-600 min-h-screen min-w-full">
                <div className="grow-1">
                    <img
                        src="/profile.jpg"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>

                <div className=" bg-green-300 grow-1">
                    <h1 className="text-3xl font-bold">曲奇放克</h1>
                    台灣人｜A型
                    <p className="py-6">
                        業務範圍包括但不限於 ：<br></br> 插畫 / 動畫 / 繪畫教學
                        / Youtube相關
                    </p>
                    <p className="py-6">
                        歡迎各種合作來信詢問 。<br></br> a88115146@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <section className="overflow-hidden bg-base-100 sm:grid sm:grid-cols-2 items-center max-h-screen">
            <div className="p-8">
                <div className="mx-auto max-w-xl text-center sm:text-left">
                    <h2 className="text-2xl font-bold md:text-3xl">
                        KOOKIE FUNK.
                    </h2>

                    <div className="md:mt-4 md:block">
                        <p>
                            Hi，我是曲奇放克，這是一個正經的網站，相關合作歡迎詢問。
                        </p>
                        <br></br>
                        <p>
                            『
                            在創作的路上，逐漸學會挖掘自己的內心，進一步的了解自己，才會明白自己喜歡什麼、不喜歡什麼、討厭什麼、害怕什麼，唯有如此，也才能多放過自己一點。
                            』
                        </p>
                    </div>
                </div>
            </div>

            <img
                alt="funk"
                src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/87069518_1559089714245860_1648573392128835584_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ZX012cSb0s8AX__Ylsl&_nc_ht=scontent-tpe1-1.xx&oh=00_AfDyN39biIFh_grs0YwRXP8vWSbKLhhx3JwgggNZ5GnuGg&oe=639BC718"
                className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-[30px] md:h-[calc(100%_-_4rem)] md:rounded-[60px]"
            />
        </section>
    );
};

export default home;
