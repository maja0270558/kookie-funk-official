import React from "react";
import GalleryImage from "../components/GalleryImage";
import { WorksData } from "../pages/api/get/works";

export interface GalleryData {
    works: WorksData;
}

// grid gap-y-4 gap-x-4 grid-cols-8 sm:grid-cols-8 lg:grid-cols-8
function Gallery(props: GalleryData) {
    return (
        <div className="mx-auto px-4 py-8">
            <div className="uppercase pb-4 pl-4 prose">
                <h2>{props.works.section_name}</h2>
            </div>
            <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                {props.works.imgs.map((value) => {
                    return <GalleryImage path={value.img} />;
                })}
            </div>
        </div>
    );
}

export default Gallery;
