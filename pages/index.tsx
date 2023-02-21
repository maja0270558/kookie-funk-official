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
            <div className="flex flex-row  min-h-[100vh]">
                <div className="flex flex-col lg:flex-row-reverse flex-1 ">
                    <div className="flex flex-auto justify-center min-w-[368] lg:max-w-[50vw] max-h-[100vh]">
                        {
                            <Image
                                alt=""
                                src={"/intro.png"}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className=" object-contain object-bottom w-auto h-auto aspect-auto"
                            />
                        }
                    </div>

                    <div className="flex flex-1 m-10 justify-center lg:justify-end lg:place-self-end">
                        <div className="flex lg:flex-auto">
                            <div className=" text-gray-500 grow-1 prose-lg lg:prose-xl lg:font-bold lg:pb-8 m-auto">
                                <h1 className="font-bold text-center lg:text-left">
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
