import { TypographyStylesProvider } from "@mantine/core";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { Image as MantineImage } from "@mantine/core";

import React from "react";
import GalleryImage from "../components/GalleryImage";
import "keen-slider/keen-slider.min.css";
import { DetailLayout } from "./DetailLayout";

const DetailPreview = (props: {
    src: string;
    nailSrc: string;
    title: string;
    desc: string;
}) => {
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
                {Array(20)
                    .fill(0)
                    .map((v, i) => i)
                    .map((value) => {
                        return (
                            <div
                                key={value}
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
                className="object-contain w-auto h-auto aspect-auto min-h-[80vh] max-h-[85vh] block m-auto align-middle drop-shadow-md"
            />
        </div>
    );

    const compomentTitle = (
        <TypographyStylesProvider className="text-base-content prose-lg lg:min-w-full">
            <div
                dangerouslySetInnerHTML={{
                    __html: props.title ?? "",
                }}
            />
        </TypographyStylesProvider>
    );

    const compomentDesc = (
        <TypographyStylesProvider className="text-base-content prose-lg lg:min-w-full">
            <div
                dangerouslySetInnerHTML={{
                    __html: props.desc ?? "",
                }}
            />
        </TypographyStylesProvider>
    );

    return (
        <DetailLayout
            image={compomentImage}
            title={compomentTitle}
            content={compomentDesc}
            otherSection={otherPostsSection}
        ></DetailLayout>
    );
};

export default DetailPreview;
