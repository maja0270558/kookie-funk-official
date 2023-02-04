import { TypographyStylesProvider } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { Image as MantineImage } from '@mantine/core';

import React from "react";
import GalleryImage from "../components/GalleryImage";
import "keen-slider/keen-slider.min.css";

const DetailPreview = (props: {
    src: string;
    nailSrc: string;
    title: string;
    desc: string;
}) => {
    const other = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const cellSize = 150;
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "free",
        slides: {
            perView: "auto",
            spacing: 12,
        },
    });
    const otherPostsSection = (
        <div className="pt-4">
            <div
                ref={ref}
                className="keen-slider min-w-full "
                style={{ maxHeight: cellSize, minHeight: cellSize }}
            >

                {other.map(() => {
                    return (
                        <div
                            className="keen-slider__slide"
                            style={{
                                maxWidth: cellSize,
                                minWidth: cellSize,
                                maxHeight: cellSize,
                                minHeight: cellSize,
                            }}
                        >
                            <MantineImage
                                width={cellSize}
                                height={cellSize}
                                src={null}
                                withPlaceholder
                            />

                        </div>
                    );
                })}
            </div>
        </div>
    );

    const compomentImage = (
        <div className=" ">
            <Image
                alt=""
                // src={"/profile.jpg"}
                src={props.src}
                width="0"
                height="0"
                sizes="100vw"
                className="object-contain w-auto h-auto aspect-auto  lg:min-h-[85vh] max-h-[85vh] block ml-auto mr-auto"
            />
        </div>


    );

    const compomentTitle = (
        <TypographyStylesProvider className="text-base-content">
            <div
                dangerouslySetInnerHTML={{
                    __html: props.title ?? "",
                }}
            />
        </TypographyStylesProvider>
    );

    const compomentDesc = (
        <TypographyStylesProvider className="text-base-content">
            <div
                dangerouslySetInnerHTML={{
                    __html: props.desc ?? "",
                }}
            />
        </TypographyStylesProvider>
    );

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row place-content-center">
                <div className="flex flex-col lg:flex-row flex-1 gap-4">
                    <div className="">
                        {compomentImage}
                    </div>

                    <div className="flex lg:flex-1 lg:min-w-[30%]">
                        <div className="flex lg:items-end ">
                            {compomentTitle}
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-1 lg:items-end p-4">
                {compomentDesc}
            </div>
            {otherPostsSection}
        </div>
    );
};

export default DetailPreview;
