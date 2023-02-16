import {
    ActionIcon,
    Badge,
    Button,
    Center,
    Divider,
    Group,
    Input,
    LoadingOverlay,
    Menu,
    Modal,
    Spoiler,
    Table,
    TypographyStylesProvider,
} from "@mantine/core";
import React, { useState } from "react";
import Error from "next/error";
import Image from "next/image";
import {
    IconDots,
    IconEye,
    IconEyeOff,
    IconTrash,
    IconAdjustmentsHorizontal,
    IconSearch,
    IconPencil,
} from "@tabler/icons";
import classNames from "classnames";
import useSWRMutation from "swr/mutation";
import Router from "next/router";
import { useAppDispatch } from "../hook";
import createFetcher from "../helper/Fetcher";
import { useEffect } from "react";
import { ColorSchemeToggle } from "../components/ThemeSwitcher";
interface DashBoardData {
    id: number;
    image_path: string;
    nail_image_path: string;
    title: string;
    desc: string;
    display: number;
    ts: string;
    categorize: {
        id: number;
        section: string;
    };
}

const dashboard = () => {
    const [dashboardData, setDashboardData] = useState<any[]>([]);
    const [filter, setFilter] = useState("");
    const [cateFilter, setCatFilter] = useState("");

    useEffect(() => {
        worksRequest.trigger();
        categorizeDataRequest.trigger();
    }, []);

    const worksRequest = useSWRMutation("/api/get/dashboard", (url) => {
        return createFetcher(url).then((data) => {
            setDashboardData(data);
            return data;
        });
    });

    // categorize
    const [catData, setCatData] = useState<any[]>([]);

    const categorizeDataRequest = useSWRMutation("/api/get/categorize", (url) =>
        createFetcher(url).then((data) => {
            setCatData(data);
            return data;
        })
    );

    // cat requests
    const deleteCategorizeRequest = useSWRMutation(
        "/api/post/delete_cat",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    setOpened(false);
                    Router.reload();
                }
                return data;
            })
    );

    // edit cat request
    const editCategorizeRequest = useSWRMutation(
        "/api/post/edit_cat",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    setOpened(false);
                    Router.reload();
                }
                return data;
            })
    );

    // categorize modal open
    const [opened, setOpened] = useState(false);
    const [editCatData, setEditCatData] = useState<{
        id: number;
        section: string;
    } | null>(null);

    const [editCatInputValue, setEditCatInputValue] = useState("");
    const [editSaveButtonEnable, setEditSaveButtonEnable] = useState(false);

    // delete post request
    const deletePostRequest = useSWRMutation(
        "/api/post/delete_post",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    Router.reload();
                }
                return data;
            })
    );

    // edit cat request
    const editPostPublicRequest = useSWRMutation(
        "/api/post/edit_post_status",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    Router.reload();
                }
                return data;
            })
    );

    if (worksRequest.error)
        return <Error statusCode={500} title="Something going wrong here :(" />;

    if (worksRequest.isMutating) return <div className=""></div>;

    const emptyTableContent = (
        <div className="flex flex-1  justify-center text-center rounded-lg">
            <Center>
                <div className="max-w-md flex-auto">
                    <Image
                        src="/greyEmptyState.png"
                        alt={""}
                        width="500"
                        height="500"
                        className="rounded-lg"
                        priority={true}
                    ></Image>
                </div>
            </Center>
        </div>
    );

    const ths = (
        <tr>
            <th className="px-4 py-2 w-[50px]">Image</th>
            <th className="px-4 py-2 w-1/12">Categorize</th>
            <th className="px-4 py-2 w-1/2">Title</th>
            <th className="px-4 py-2 w-1/2">Description</th>
            <th className="px-4 py-2">Public</th>
            <th className="px-4 py-2 w-1/12">Create Time</th>
            <th className="px-4 py-2 w-[20px]"></th>
        </tr>
    );

    const rows =
        dashboardData instanceof Array &&
        dashboardData
            .filter((element: DashBoardData) => {
                if (cateFilter == "") return true;
                return element.categorize.section
                    .toLowerCase()
                    .includes(cateFilter.toLowerCase());
            })
            .filter((element: DashBoardData) => {
                if (filter == "") return true;
                return (
                    element.title
                        .toLowerCase()
                        .includes(filter.toLowerCase()) ||
                    element.desc.toLowerCase().includes(filter.toLowerCase()) ||
                    element.categorize.section
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                );
            })
            .map((element: DashBoardData) => (
                <tr key={element.id}>
                    <td>
                        <button
                            onClick={() => {
                                Router.push(`/detail/${element.id}`);
                            }}
                        >
                            <Image
                                src={element.nail_image_path}
                                alt={""}
                                width="100"
                                height="100"
                                placeholder="blur"
                                blurDataURL="/placeholder.jpeg"
                                className="rounded-lg"
                                priority={true}
                            ></Image>
                        </button>
                    </td>
                    <td>
                        <Badge>
                            <p className="uppercase font-medium">
                                {element.categorize.section}
                            </p>
                        </Badge>
                    </td>
                    <td>
                        <Spoiler
                            maxHeight={100}
                            showLabel="Show more"
                            hideLabel="Hide"
                        >
                            <TypographyStylesProvider className="text-base-content mt-4 break-all min-w-[20vw]">
                                <div
                                    className="prose lg:prose-lg prose-img:rounded-sm"
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
                            <TypographyStylesProvider className="text-base-content break-all">
                                <div
                                    className="prose lg:prose-lg prose-img:rounded-sm"
                                    dangerouslySetInnerHTML={{
                                        __html: element.desc,
                                    }}
                                />
                            </TypographyStylesProvider>
                        </Spoiler>
                    </td>

                    <td>
                        {element.display > 0 ? (
                            <IconEye size={16} />
                        ) : (
                            <IconEyeOff size={16} />
                        )}
                    </td>
                    <td className="">
                        <p className="text-xs"> {element.ts}</p>
                    </td>
                    <td>
                        <Menu width={200} shadow="md">
                            <Menu.Target>
                                <button>
                                    <IconDots size={16} />
                                </button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={() => {
                                        const encode = (str: string): string =>
                                            Buffer.from(str, "binary").toString(
                                                "base64"
                                            );

                                        const data = {
                                            id: element.id.toString(),
                                        };
                                        Router.push({
                                            pathname: "/edit_post",
                                            query: data,
                                        });
                                    }}
                                    icon={
                                        <IconAdjustmentsHorizontal size={14} />
                                    }
                                >
                                    Edit
                                </Menu.Item>

                                <Menu.Item
                                    onClick={() => {
                                        const data = {
                                            id: element.id.toString(),
                                            display:
                                                element.display > 0 ? "0" : "1",
                                        };
                                        editPostPublicRequest.trigger(
                                            JSON.stringify(data)
                                        );
                                    }}
                                    icon={
                                        element.display > 0 ? (
                                            <IconEyeOff size={14} />
                                        ) : (
                                            <IconEye size={14} />
                                        )
                                    }
                                >
                                    {element.display > 0
                                        ? "Set private"
                                        : "Set public"}
                                </Menu.Item>

                                <Menu.Item
                                    onClick={() => {
                                        const data = {
                                            id: element.id.toString(),
                                        };
                                        deletePostRequest.trigger(
                                            JSON.stringify(data)
                                        );
                                    }}
                                    color="red"
                                    icon={<IconTrash size={14} />}
                                >
                                    Remove this post
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </td>
                </tr>
            ));

    const saveButtonClass = classNames("btn", {
        ["btn-primary text-white"]: editSaveButtonEnable,
        ["glass btn-disabled"]: !editSaveButtonEnable,
    });

    const worksTable = (
        <div className=" relative">
            <h1 className="prose-lg font-bold mt-2 mb-2">Manage your works</h1>
            <Input
                className=" sticky z-50 top-14 lg:top-2"
                icon={<IconSearch />}
                placeholder="You can search 『title』, 『description』,『categorize』 here"
                onChange={(t) => {
                    setFilter(t.target.value);
                }}
            />
            <div className="overflow-auto">
                <Table
                    className="table-auto"
                    captionSide="bottom"
                    highlightOnHover={true}
                    horizontalSpacing="lg"
                    verticalSpacing="sm"
                >
                    <thead>{ths}</thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        </div>
    );
    return (
        <div className="mt-14 lg:mt-0 flex flex-col p-4 min-h-full">
            <div className=" absolute top-14 lg:top-0 right-4">
                <ColorSchemeToggle />
            </div>

            <Modal
                opened={opened}
                onClose={() => {
                    editCategorizeRequest.reset();
                    deleteCategorizeRequest.reset();
                    setEditCatInputValue("");
                    setEditCatData(null);
                    setEditSaveButtonEnable(false);
                    setOpened(false);
                }}
                title="Edit Pannel"
            >
                <LoadingOverlay
                    visible={
                        deleteCategorizeRequest.isMutating ||
                        editCategorizeRequest.isMutating ||
                        deletePostRequest.isMutating
                    }
                    overlayBlur={2}
                />
                {
                    <div className="flex flex-col gap-2">
                        <Input
                            value={editCatInputValue}
                            onChange={(t) => {
                                const saveButtonEnable =
                                    t.target.value == "" ||
                                    t.target.value == editCatData?.section;
                                setEditSaveButtonEnable(!saveButtonEnable);
                                setEditCatInputValue(t.target.value);
                            }}
                        />

                        <button
                            className={saveButtonClass}
                            onClick={() => {
                                editCategorizeRequest.trigger(
                                    JSON.stringify({
                                        id: editCatData?.id,
                                        section: editCatInputValue,
                                    })
                                );
                            }}
                        >
                            Save
                        </button>

                        <div className="flex flex-row border border-dashed border-red-400 rounded-xl p-4 m-4 items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    deleteCategorizeRequest.reset();
                                    deleteCategorizeRequest.trigger(
                                        JSON.stringify({
                                            id: editCatData?.id,
                                        })
                                    );
                                }}
                            >
                                <IconTrash size={18} color="red" />
                            </button>

                            <div className=" prose-xs  text-red-300 ">
                                <p className="font-bold"> **重要！**</p>
                                移除類別時將會移除類別底下所有相關的貼文，請想清楚後再移除
                            </div>
                        </div>
                    </div>
                }
            </Modal>
            {
                <h1 className="prose-lg font-bold mt-2 mb-2">
                    {catData.length > 0
                        ? "Manage your categorize"
                        : "No categorize"}
                </h1>
            }

            <div className="flex flex-row gap-4">
                <Group className="flex-auto">
                    {catData.length > 0 &&
                        catData.map((element) => {
                            return (
                                <div key={element.value} onClick={() => {}}>
                                    <Badge
                                        className=" cursor-pointer"
                                        // 'light' | 'filled' | 'outline' | 'dot' | 'gradient'
                                        variant={
                                            element.label == cateFilter
                                                ? "light"
                                                : "light"
                                        }
                                        size="lg"
                                        // 'dark' | 'gray' | 'red' | 'pink' | 'grape' | 'violet' | 'indigo' | 'blue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' | 'teal'
                                        color={
                                            element.label == cateFilter
                                                ? "teal"
                                                : "gray"
                                        }
                                        sx={{ paddingRight: 3 }}
                                        rightSection={
                                            <ActionIcon
                                                size="xs"
                                                radius="xl"
                                                variant="transparent"
                                                onClick={() => {
                                                    setEditCatInputValue(
                                                        element.label
                                                    );
                                                    setEditCatData({
                                                        id: element.value,
                                                        section: element.label,
                                                    });
                                                    setOpened(true);
                                                }}
                                            >
                                                <IconPencil size={16} />
                                            </ActionIcon>
                                        }
                                    >
                                        <div
                                            onClick={() => {
                                                const filterValue =
                                                    element.label == cateFilter
                                                        ? ""
                                                        : element.label;
                                                setCatFilter(filterValue);
                                            }}
                                        >
                                            {element.label.toUpperCase()}
                                        </div>
                                    </Badge>
                                </div>
                            );
                        })}
                </Group>
                <Button
                    className="btn btn-primary text-white"
                    leftIcon={<IconPencil />}
                    onClick={() => {
                        Router.push("/create_post");
                    }}
                >
                    New post
                </Button>
            </div>
            {worksTable}
            {(worksRequest.data instanceof Array &&
                (worksRequest.data.length <= 0 ||
                    !worksRequest.data ||
                    !rows)) ||
                ((rows as any[]).length <= 0 && emptyTableContent)}
        </div>
    );
};

export default dashboard;
