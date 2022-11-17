import React from "react";

type GalleryImageProps = {
    path: string;
};

function GalleryImage(props: GalleryImageProps) {
    return (
        <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden group-hover:drop-shadow-lg">
                <img
                    alt=""
                    src={props.path}
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                />
            </div>
        </a>
    );
}

export default GalleryImage;
