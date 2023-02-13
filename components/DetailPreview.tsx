import { Image as MantineImage } from "@mantine/core";
import React from "react";
import { DetailLayout } from "./DetailLayout";
import GalleryImage from "./GalleryImage";

const DetailPreview = (props: {
    src: string;
    nailSrc: string;
    title: string;
    desc: string;
}) => {
    const cellSize = 95;

    const sectionItems = Array(20)
        .fill(0)
        .map((v, i) => i)
        .map((value, index) => {
            return (
                <GalleryImage
                    className={"h-[120px] w-[120px]"}
                    path={props.nailSrc}
                    id={index.toString()}
                />
            );
        });

    return (
        <DetailLayout
            image={props.src}
            title={props.title ?? ""}
            content={props.desc ?? ""}
            otherSection={sectionItems}
        ></DetailLayout>
    );
};

export default DetailPreview;
