import React from "react";
import Image from "next/image";
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

    if (error) return <div>failed to load</div>;
    if (isLoading)
        return (
            <div className="flex items-center justify-center space-x-2 min-h-full">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
            </div>
        );

    if (data) {
        const otherPostsSection = data.others ? (
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
                                ;
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : null;

        const compoment = data.post ? (
            <div className="flex flex-col p-4">
                <div className="flex flex-row  place-content-center min-h-[95vh]">
                    <div className="flex flex-col lg:flex-row flex-1 ">
                        <div className="relative flex flex-auto justify-center min-w-[368] max-w-[70%] pr-8">
                            <Image
                                alt=""
                                // src={"/profile.jpg"}
                                src={data.post.image}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="object-contain lg:object-contain w-auto h-auto aspect-auto"
                            />
                        </div>

                        <div className="flex lg:flex-1">
                            <div className="flex lg:items-end editor">
                                <TypographyStylesProvider className="text-base-content">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.post.title ?? "",
                                        }}
                                    />
                                </TypographyStylesProvider>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 lg:items-end editor p-4">
                    <TypographyStylesProvider className="text-base-content">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data.post.description ?? "",
                            }}
                        />
                    </TypographyStylesProvider>
                </div>

                {otherPostsSection}
            </div>
        ) : (
            <div>Loading...</div>
        );
        return compoment;
    }
};

export default works;
