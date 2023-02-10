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
import { DetailLayout } from "../../components/DetailLayout";

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

    const router = useRouter();
    const { id } = router.query;
    const { data, error, isLoading } = useSWR(
        id ? `/api/get/detail?id=${id}` : null,
        (url) => fetch(url).then((res) => res.json())
    );

    if (isLoading) return <div className=""></div>;

    if (data) {
        // error handling
        if (data.error) return <Error statusCode={404} title={data.error} />;

        const otherPostsSection = data.others && (
            <div className="mt-4">
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
            <TypographyStylesProvider className="text-base-content lg:min-w-full">
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.post.title ?? "",
                    }}
                />
            </TypographyStylesProvider>
        );

        const compomentDesc = data.post?.description && (
            <TypographyStylesProvider className="text-base-content mt-4 lg:min-w-full ">
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.post.description ?? "",
                    }}
                />
            </TypographyStylesProvider>
        );

        return (
            <DetailLayout
                image={compomentImage}
                title={compomentTitle}
                content={compomentDesc}
                otherSection={otherPostsSection}
            ></DetailLayout>
        );
    }
};

export default works;
