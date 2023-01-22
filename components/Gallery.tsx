import React from "react";
import GalleryImage from "../components/GalleryImage";

type GalleryProps = {
    sectionTitle: string;
    imagePath: string[];
};
// grid gap-y-4 gap-x-4 grid-cols-8 sm:grid-cols-8 lg:grid-cols-8
function Gallery(props: GalleryProps) {
    return (
        <div className="mx-auto px-4 py-8">
            <div className="uppercase pb-4 pl-4 prose">
                <h2>{props.sectionTitle}</h2>
            </div>
            <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                {props.imagePath.map((value: string) => {
                    return <GalleryImage path={value} />;
                })}
            </div>
        </div>
    );
}

export default Gallery;
