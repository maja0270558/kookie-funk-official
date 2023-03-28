import { Center } from "@mantine/core";
import React from "react";
import TutorialElement from "../components/TutorialElement";

const course = () => {
    return (
        <div className="container mx-auto p-6 grid grid-rows-1 lg:grid-cols-2 gap-4 drop-shadow-lg lg:mt-20">
            <div className="col-span-1 flex flex-col p-4 border-2 hover:border-primary bg-base-100">
                <TutorialElement
                    src="/course.png"
                    link="https://hahow.in/cr/kookiefunk"
                    title="HAHOW 線上課程"
                    desc="這是我的第一堂在HAHOW好學校上架的線上課程，內容是分享我在學畫圖過程中所體會到素描之重要性，以及要如何實際去運用素描提升自己的插畫能力，適合初學者入門者"
                />
            </div>
            <div className="col-span-1 flex flex-col p-4 border-2 hover:border-primary bg-base-100">
                <TutorialElement
                    src="/youtube.png"
                    link="https://www.youtube.com/@kookiefunk"
                    title="Youtube"
                    desc="我的Youtube有一些免費的好康，包括繪畫的技巧、想法分享，並且不定時開開直播聊聊天畫
畫圖。"
                />
            </div>
        </div>
    );
};

export default course;
