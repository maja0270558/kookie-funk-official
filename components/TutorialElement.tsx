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
            <div className="flex flex-col lg:flex-row p-8">
                <img
                    className=" w-full object-cover lg:w-[50vh] lg:h-auto"
                    src={props.src}
                    alt=""
                />
                <div className="p-6 flex flex-col justify-center text-gray-500">
                    <h5 className="text-xl font-bold mb-2">
                        {props.title}
                    </h5>
                    <p className="text-inherit text-sm mb-4">{props.desc}</p>
                </div>
            </div>
        </Link>
    );
}

export default TutorialElement;
