import React from "react";
import TutorialElement from "../components/TutorialElement";

const course = () => {
    return (
        <div className="flex flex-col lg:justify-evenly min-h-screen">
            <TutorialElement
                src="/corse.jpg"
                link="https://hahow.in/courses/60bdbc454ee6592acad8e950/main"
                title="線上課程｜『PROCREATE插畫入門 － 從素描到風格』"
                desc="這是我的第一堂在HAHOW好學校上架的線上課程 ，
                        內容是分享我在學畫圖過程 中體會到的素描的重要性 ，
                        以及要如何實際去運用素描提升自己的插畫能力 ， 適
                        合初學者。"
            />
            <TutorialElement
                src="/youtube.jpg"
                link="https://www.youtube.com/@kookiefunk"
                title="Youtube｜免費繪畫教學影片"
                desc="我的Youtube有一些免費的好康 ， 包括繪畫的技巧、想法分享 ， 並且不定時開開直播聊聊天畫
畫圖 。"
            />
        </div>
    );
};

export default course;
