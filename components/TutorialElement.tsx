import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

type TutorialProps = {
    src: string;
    link: string;
    title: string;
    desc: string;
};

function TutorialElement(props: TutorialProps) {
    return (
        <Link href={props.link} target="_blank">
            <div className="flex flex-col pt-6 pl-6 pr-6 ">
                <Image
                    src={props.src}
                    alt={""}
                    width="500"
                    height="500"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpeg"
                    className=" object-fill w-full aspect-[16/9]"
                    priority={true}
                ></Image>

                <div className="pt-6 flex flex-col text-gray-500">
                    <h5 className="text-xl font-semibold mb-4">
                        {props.title}
                    </h5>
                    <p className="text-inherit text-xs mb-4 tracking-[0.28em] font-sans">
                        {props.desc}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default TutorialElement;
