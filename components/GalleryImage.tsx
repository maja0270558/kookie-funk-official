import React from "react";
import Image from "next/image";

type GalleryImageProps = {
    path: string;
};

function GalleryImage(props: GalleryImageProps) {
    return (
        <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden group-hover:drop-shadow-lg">
                <Image
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                    src={props.path}
                    alt={"work"}
                    // 用來決定圖片的比例
                    width={100}
                    height={100}
                    priority={true}
                ></Image>

            </div>
        </a>
    );
}

export default GalleryImage;
