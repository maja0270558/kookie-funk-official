import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

type GalleryImageProps = {
    path: string;
    id: string;
};

function GalleryImage(props: GalleryImageProps) {
    const [isLoading, setLoading] = useState(true);

    const imageClass = classNames("duration-700 ease-in-out", {
        ["grayscale blur-2xl"]: isLoading,
        ["grayscale-0 blur-0 group-hover:scale-110 transition object-cover h-48 w-48"]:
            !isLoading,
    });
    return (
        <Link href={`../detail/${props.id}`} className="group">
            <div className="duration-100 ease-in-out aspect-w-1 aspect-h-1 overflow-hidden group-hover:drop-shadow-lg ">
                <Image
                    src={props.path}
                    alt={""}
                    width="0"
                    height="0"
                    sizes="100vw"
                    onLoadingComplete={() => setLoading(false)}
                    className={imageClass}
                    priority={true}
                ></Image>
            </div>
        </Link>
    );
}

export default GalleryImage;
