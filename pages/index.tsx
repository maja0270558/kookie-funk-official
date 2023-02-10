import React from "react";
import Image from "next/image";
import Head from "next/head";

const home = () => {
    return (
        <div className="flex flex-col">
            <Head>
                <title>KookieFunk</title>
                <meta name="description" content="KOOKIE FUNK" key="desc" />
            </Head>
            <div className="flex flex-row  place-content-center min-h-[100vh]">
                <div className="flex flex-col lg:flex-row-reverse flex-1 ">
                    <div className="relative flex flex-auto justify-center min-w-[368]">
                        {
                            <Image
                                alt=""
                                src={"/home_avatar.png"}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className=" object-fill w-auto h-auto aspect-auto"
                            />
                        }
                    </div>

                    <div className="flex flex-1 pt-4 items-end justify-center lg:justify-end">
                        <div className="flex">
                            <div className="grow-1 text-base-content prose-sm lg:prose-lg lg:pb-8 m-auto">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default home;
