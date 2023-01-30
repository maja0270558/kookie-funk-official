import React from "react";
import Image from "next/image";
import Link from "next/link";

type GalleryImageProps = {
    path: string;
    id: string;
};

function GalleryImage(props: GalleryImageProps) {
    return (
        <Link href={`../detail/${props.id}`} className="group">
            <div className="duration-100 ease-in-out aspect-w-1 aspect-h-1 overflow-hidden group-hover:drop-shadow-lg">
                <Image
                    src={props.path}
                    alt={""}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="group-hover:scale-110 transition object-cover h-48 w-48"
                    priority={true}
                ></Image>
            </div>
        </Link>
    );
}

export default GalleryImage;
