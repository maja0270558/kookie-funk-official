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

    const imageClass = classNames("duration-200 ease-in-out  object-fill", {
        ["grayscale blur-2xl"]: isLoading,
        ["grayscale-0 blur-0 group-hover:scale-105 transition"]: !isLoading,
    });
    return (
        <Link href={`../detail/${props.id}`} className="group">
            <div className="flex group-hover:drop-shadow-lg aspect-1 overflow-hidden">
                <Image
                    src={props.path}
                    alt={""}
                    width="200"
                    height="200"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpeg"
                    onLoadingComplete={() => setLoading(false)}
                    className={imageClass}
                    priority={true}
                ></Image>
            </div>
        </Link>
    );
}

export default GalleryImage;
