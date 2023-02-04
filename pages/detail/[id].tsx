import React from "react";
import Image from "next/image";
import Error from "next/error";
// fetch library
import useSWR from "swr";
import { useRouter } from "next/router";
// rich text
import { TypographyStylesProvider } from "@mantine/core";
// slider
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
// custom image
import GalleryImage from "../../components/GalleryImage";

const works = () => {
    const cellSize = 150;
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "free",
        slides: {
            perView: "auto",
            spacing: 12,
        },
    });

    const router = useRouter();
    const { id } = router.query;
    const { data, error, isLoading } = useSWR(
        id ? `/api/get/detail?id=${id}` : null,
        (url) => fetch(url).then((res) => res.json())
    );

    if (isLoading)
        return (
            <div className="flex items-center justify-center space-x-2 min-h-full">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
            </div>
        );

    if (data) {
        // error handling
        if (data.error) return <Error statusCode={404} title={data.error} />;

        const otherPostsSection = data.others && (
            <div className="pt-4">
                <div
                    ref={ref}
                    className="keen-slider max-w-screen "
                    style={{ maxHeight: cellSize, minHeight: cellSize }}
                >
                    {data.others.map((value: { img: string; id: string }) => {
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
                    })}
                </div>
            </div>
        );

        const compomentImage = data.post?.image && (
            <div className=" ">
                <Image
                    alt=""
                    // src={"/profile.jpg"}
                    src={data.post.image}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="object-contain w-auto h-auto aspect-auto min-h-[80vh] max-h-[85vh] block m-auto align-middle drop-shadow-md"
                />
            </div>
        );

        const compomentTitle = data.post?.title && (
            <TypographyStylesProvider className="text-base-content">
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.post.title ?? "",
                    }}
                />
            </TypographyStylesProvider>
        );

        const compomentDesc = data.post?.description && (
            <TypographyStylesProvider className="text-base-content">
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.post.description ?? "",
                    }}
                />
            </TypographyStylesProvider>
        );

        return (
            <div className="flex flex-col p-4">
                <div className="flex flex-row place-content-center">
                    <div className="flex flex-col lg:flex-row flex-1 gap-4">
                        <div className=" block m-auto align-middle">
                            {compomentImage}
                        </div>

                        <div className="flex lg:flex-1 lg:min-w-[30%]">
                            <div className="flex lg:items-end ">
                                {compomentTitle}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-1 lg:items-end p-4">
                    {compomentDesc}
                </div>
                {otherPostsSection}
            </div>
        );
    }
};

export default works;
