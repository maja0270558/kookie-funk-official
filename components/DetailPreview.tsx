import { TypographyStylesProvider } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import React from "react";
import GalleryImage from "../components/GalleryImage";

const DetailPreview = (props: {
    src: string;
    nailSrc: string;
    title: string;
    desc: string;
}) => {
    const other = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
                className="keen-slider max-w-screen "
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
                            <GalleryImage path={props.nailSrc} id={""} />;
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const compomentImage = (
        <Image
            alt=""
            // src={"/profile.jpg"}
            src={props.src}
            width="0"
            height="0"
            sizes="100vw"
            className="object-contain lg:object-contain w-auto h-auto aspect-auto"
        />
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
            <div className="flex flex-row  place-content-center min-h-[95vh] max-h-[95vh]">
                <div className="flex flex-col lg:flex-row flex-1 ">
                    <div className="relative flex flex-auto justify-center min-w-[368] lg:max-w-[70%] pr-8">
                        {compomentImage}
                    </div>

                    <div className="flex lg:flex-1">
                        <div className="flex lg:items-end editor">
                            {compomentTitle}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 lg:items-end editor p-4">
                {compomentDesc}
            </div>
            {otherPostsSection}
        </div>
    );
};

export default DetailPreview;
