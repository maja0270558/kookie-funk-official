import React from "react";
import Image from "next/image";
import Link from "next/link";

type GalleryImageProps = {
    path: string;
    id: string;
};

function GalleryImage(props: GalleryImageProps) {
    return (
        <Link href={`./detail/${props.id}`} className="group">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden group-hover:drop-shadow-lg">
                <Image
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                    src={props.path}
                    alt={""}
                    // 用來決定圖片的比例
                    width={100}
                    height={100}
                    priority={true}
                ></Image>
            </div>
        </Link>
    );
}

export default GalleryImage;
