import {
    ActionIcon,
    Alert,
    Badge,
    Button,
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
import useSWR from "swr";
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
import { errorNotification } from "../components/NotificationService";
import createFetcher from "../helper/Fetcher";
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
    const dispatch = useAppDispatch();

    const [dashboardData, setDashboardData] = useState<any[]>([]);
    const [filter, setFilter] = useState("");

    const worksRequest = useSWR("/api/get/dashboard", (url) =>
        createFetcher(url).then((data) => {
            setDashboardData(data);
            return data;
        })
    );

    // categorize
    const [catData, setCatData] = useState<any[]>([]);
    const categorizeDataRequest = useSWR("/api/get/categorize", (url) =>
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
    if (worksRequest.isLoading)
        return (
            <div className="flex items-center justify-center space-x-2 min-h-full">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
            </div>
        );

    const emptyTableContent = (
        <div className="hero min-h-full bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-2xl font-bold">There's nothing here</h1>
                    <p className="py-6">
                        已乃僧忽他出，數日不返，探其篋笥，空空如也。
                    </p>
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
            <th className="px-4 py-2 w-1/12"></th>
        </tr>
    );

    const rows = dashboardData
        .filter((element: DashBoardData) => {
            if (filter == "") return true;
            return (
                element.title.toLowerCase().includes(filter.toLowerCase()) ||
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
                            width="50"
                            height="50"
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
                                        title: encode(element.title),
                                        content: encode(element.desc),
                                        selectedCatId:
                                            element.categorize.id.toString(),
                                        imgSrc: element.image_path,
                                    };
                                    Router.push({
                                        pathname: "/edit_post",
                                        query: data,
                                    });
                                }}
                                icon={<IconAdjustmentsHorizontal size={14} />}
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

    const pencelButton = (
        <ActionIcon size="xs" radius="xl" variant="transparent">
            <IconPencil size={16} />
        </ActionIcon>
    );

    const saveButtonClass = classNames("btn", {
        ["btn-primary"]: editSaveButtonEnable,
        ["btn-disabled"]: !editSaveButtonEnable,
    });
    return (
        <div className="flex flex-col m-4">
            <LoadingOverlay
                visible={deletePostRequest.isMutating}
                overlayBlur={2}
            />{" "}
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

                            <p className=" prose-xs text-red-400 font-bold">
                                **Important!** This action will remove all the
                                works related to this categorize.
                                <br />
                                <br />
                                **重要！**
                                移除類別時將會移除類別底下所有相關的貼文，請檢查清楚後再移除
                            </p>
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
                                <div
                                    key={element.value}
                                    onClick={() => {
                                        setEditCatInputValue(element.label);
                                        setEditCatData({
                                            id: element.value,
                                            section: element.label,
                                        });
                                        setOpened(true);
                                    }}
                                >
                                    <Badge
                                        size="lg"
                                        color="teal"
                                        sx={{ paddingRight: 3 }}
                                        rightSection={pencelButton}
                                    >
                                        {element.label.toUpperCase()}
                                    </Badge>
                                </div>
                            );
                        })}
                </Group>
                <Button
                    className="btn btn-primary"
                    leftIcon={<IconPencil />}
                    onClick={() => {
                        Router.push("/create_post");
                    }}
                >
                    New post
                </Button>
            </div>
            <h1 className="prose-lg font-bold mt-2 mb-2">Manage your works</h1>
            <Input
                icon={<IconSearch />}
                placeholder="You can search 『title』, 『description』,『categorize』 here"
                onChange={(t) => {
                    setFilter(t.target.value);
                }}
            />
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
            {(worksRequest.data.length <= 0 || !worksRequest.data) &&
                emptyTableContent}
        </div>
    );
};

export default dashboard;
