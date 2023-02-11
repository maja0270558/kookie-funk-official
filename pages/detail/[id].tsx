import React, { useState } from "react";
import Image from "next/image";
import Error from "next/error";
// fetch library
import useSWR from "swr";
import { useRouter } from "next/router";
// rich text
import {
    Skeleton,
    TypographyStylesProvider,
    Center,
    Loader,
} from "@mantine/core";
// slider
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
// custom image
import GalleryImage from "../../components/GalleryImage";
import { DetailLayout } from "../../components/DetailLayout";
import createFetcher from "../../helper/Fetcher";

const works = () => {
    const cellSize = 120;
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "free",
        slides: {
            perView: "auto",
            spacing: 12,
        },
    });
    const [imgIsLoading, setImgIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;
    const { data, error, isLoading } = useSWR(
        id ? `/api/get/detail?id=${id}` : null,
        (url) => createFetcher(url)
    );

    if (isLoading)
        return (
            <Center className=" min-h-full">
                <Loader size={"xl"}></Loader>
            </Center>
        );

    if (data) {
        // error handling
        if (data.error)
            return (
                <Error statusCode={404} title="Something going wrong here :(" />
            );

        const otherPostsSection =
            data.others instanceof Array && data.others.length > 0 ? (
                <div className="mt-4">
                    <div
                        ref={ref}
                        className="keen-slider max-w-screen "
                        style={{ maxHeight: cellSize, minHeight: cellSize }}
                    >
                        {data.others.map(
                            (value: { img: string; id: string }) => {
                                return (
                                    <div
                                        className="keen-slider__slide"
                                        style={{
                                            maxWidth: cellSize,
                                            minWidth: cellSize,
                                            maxHeight: cellSize,
                                            minHeight: cellSize,
                                        }}
                                    >
                                        <GalleryImage
                                            path={value.img}
                                            id={value.id.toString()}
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            ) : null;


        return (
            <DetailLayout
                image={data.post?.image ?? ""}
                title={data.post.title ?? ""}
                content={data.post.description ?? ""}
                otherSection={otherPostsSection}
            ></DetailLayout>
        );
    }
};

export default works;
