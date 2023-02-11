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

    return (
        <DetailLayout
            image={props.src}
            title={props.title ?? ""}
            content={props.desc ?? ""}
            otherSection={otherPostsSection}
        ></DetailLayout>
    );
};

export default DetailPreview;
