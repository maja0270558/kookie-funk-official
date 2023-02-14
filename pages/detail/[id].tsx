import React from "react";
import Error from "next/error";
// fetch library
import useSWR from "swr";
import { useRouter } from "next/router";
// rich text
import { Center, Loader } from "@mantine/core";
// custom image
import GalleryImage from "../../components/GalleryImage";
import { DetailLayout } from "../../components/DetailLayout";
import createFetcher from "../../helper/Fetcher";

const works = () => {
    const cellSize = 120;
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading } = useSWR(
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
            data.others instanceof Array && data.others.length > 0
                ? data.others.map((value: { img: string; id: string }) => {
                    return (
                        <GalleryImage
                            className={"h-[120px] w-[120px]"}
                            path={value.img}
                            id={value.id.toString()}
                        />
                    );
                })
                : null;

        return (
            <DetailLayout
                forceMobile={false}
                image={data.post?.image ?? ""}
                title={data.post.title ?? ""}
                content={data.post.description ?? ""}
                otherSection={otherPostsSection}
            ></DetailLayout>
        );
    }
};

export default works;
