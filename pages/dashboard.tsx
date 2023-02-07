import {
    ActionIcon,
    Spoiler,
    Table,
    TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import Error from "next/error";
import useSWR from "swr";
import Image from "next/image";
import { IconEye, IconEyeOff } from "@tabler/icons";

const dashboard = () => {
    const { data, error, isLoading } = useSWR("/api/get/dashboard", (url) =>
        fetch(url).then((res) => res.json())
    );

    if (error)
        return <Error statusCode={500} title="Something going wrong here :(" />;
    if (isLoading)
        return (
            <div className="flex items-center justify-center space-x-2 min-h-full">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
            </div>
        );
    if (data.length <= 0 || !data)
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            There's nothing here
                        </h1>
                        <p className="py-6">
                            已乃僧忽他出，數日不返，探其篋笥，空空如也。
                        </p>
                        <button className="btn btn-primary">
                            Back to home
                        </button>
                    </div>
                </div>
            </div>
        );

    const ths = (
        <tr>
            <th className="px-4 py-2 w-1/12">Image</th>
            <th className="px-4 py-2 w-1/12">Categorize</th>
            <th className="px-4 py-2 w-1/4">Title</th>
            <th className="px-4 py-2 w-1/2">Description</th>
            <th className="px-4 py-2">Public</th>
            <th className="px-4 py-2 w-1/12">Create Time</th>
        </tr>
    );

    const rows = data.map(
        (element: {
            id: number;
            nail_image_path: string;
            title: string;
            desc: string;
            display: number;
            ts: string;
            categorize: {
                id: number;
                section: string;
            };
        }) => (
            <tr key={element.id}>
                <td>
                    <Image
                        src={element.nail_image_path}
                        alt={""}
                        width="50"
                        height="50"
                        placeholder="blur"
                        blurDataURL="/placeholder.jpeg"
                        className="rounded-lg"
                        priority={true}
                    ></Image>
                </td>
                <td>
                    <p className="uppercase font-medium">
                        {element.categorize.section}
                    </p>
                </td>
                <td>
                    <Spoiler
                        maxHeight={100}
                        showLabel="Show more"
                        hideLabel="Hide"
                    >
                        <TypographyStylesProvider className="text-base-content mt-4">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: element.title,
                                }}
                            />
                        </TypographyStylesProvider>
                    </Spoiler>
                </td>
                <td>
                    <Spoiler
                        maxHeight={100}
                        showLabel="Show more"
                        hideLabel="Hide"
                    >
                        <TypographyStylesProvider className="text-base-content">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: element.desc,
                                }}
                            />
                        </TypographyStylesProvider>
                    </Spoiler>
                </td>

                <td>
                    {element.display ? (
                        <IconEye size={16} />
                    ) : (
                        <IconEyeOff size={16} />
                    )}
                </td>
                <td className="">
                    <p className="text-xs"> {element.ts}</p>
                </td>
            </tr>
        )
    );

    return (
        <Table
            className="table-auto"
            captionSide="top"
            highlightOnHover={true}
            horizontalSpacing="lg"
            verticalSpacing="sm"
        >
            <caption>Some elements from periodic table</caption>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};

export default dashboard;
