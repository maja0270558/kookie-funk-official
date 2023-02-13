import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { Skeleton } from "@mantine/core";

type GalleryImageProps = {
    path: string;
    id: string;
    className?: string | null;
};

function GalleryImage(props: GalleryImageProps) {
    const [isLoading, setLoading] = useState(true);

    const imageClass = classNames(`duration-200 ease-in-out object-fill`, {
        [""]: isLoading,
        ["group-hover:scale-105 transition"]: !isLoading,
    });

    return (
        <Link
            href={`../detail/${props.id}`}
            className={`group  ${props.className}`}
        >
            <div
                className={`flex group-hover:drop-shadow-lg aspect-1 overflow-hidden`}
            >
                <Skeleton visible={isLoading}>
                    <Image
                        src={props.path}
                        alt={""}
                        width="500"
                        height="500"
                        placeholder="blur"
                        blurDataURL="/placeholder.jpeg"
                        onLoadingComplete={() => setLoading(false)}
                        className={imageClass}
                        priority={true}
                    ></Image>
                </Skeleton>
            </div>
        </Link>
    );
}

export default GalleryImage;
