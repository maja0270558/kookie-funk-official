import React, { useEffect } from "react";
import Error from "next/error";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { useState, useRef } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType
);
// -------------------
// react cropper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// steper
import { Stepper, Select } from "@mantine/core";
// editor
import { Editor } from "@tiptap/react";
import editor from "./TipTapEditor";
import PostEditor from "./RichTextEditor";
import { constant } from "lodash";
// alert
import { Alert } from "@mantine/core";
import { IconAlertCircle, IconBox, IconExclamationCircle } from "@tabler/icons";
// segement
import { SegmentedControl } from "@mantine/core";
// loader
import { Loader } from "@mantine/core";
import DetailPreview from "./DetailPreview";
import Router, { useRouter } from "next/router";
import { FilePondFile } from "filepond";
import { EditPostPara } from "../slices/editPostSlice";
import createFetcher from "../helper/Fetcher";
import Head from "next/head";
import { useDropboxChooser } from "use-dropbox-chooser";
import { errorNotification, waringNotification } from "./NotificationService";

function NextButton(props: {
    title: string;
    click: (e: React.MouseEvent<HTMLElement>) => void;
}) {
    return (
        <div className="flex place-content-end mt-4">
            <a
                href="#top"
                className="uppercase btn btn-primary text-white"
                onClick={props.click}
            >
                {props.title}
            </a>
        </div>
    );
}

const PostEditPage = () => {
    const router = useRouter();

    const titleEditor: Editor | null = editor("Title Require", () => {
        setUnsavedChanges(true);
    });
    const contentEditor: Editor | null = editor("Optional", () => {
        setUnsavedChanges(true);
    });
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    const { id } = router.query;
    const { data, isLoading } = useSWR(
        id ? `/api/get/find_work?id=${id}` : null,
        (url) => createFetcher(url)
    );

    useEffect(() => {
        const warningText =
            "Did you wash your ass today? Are you sure you wish to leave this page?";
        const handleWindowClose = (e: BeforeUnloadEvent) => {
            if (!unsavedChanges) return;
            e.preventDefault();
            return (e.returnValue = warningText);
        };
        const handleBrowseAway = () => {
            if (!unsavedChanges) return;
            if (window.confirm(warningText)) return;
            router.events.emit("routeChangeError");
            throw "routeChange aborted.";
        };
        window.addEventListener("beforeunload", handleWindowClose);
        router.events.on("routeChangeStart", handleBrowseAway);
        return () => {
            window.removeEventListener("beforeunload", handleWindowClose);
            router.events.off("routeChangeStart", handleBrowseAway);
        };
    }, [unsavedChanges]);

    // filepond
    useEffect(() => {
        if (!router.isReady) return;
        if (!titleEditor) return;
        if (!contentEditor) return;

        if (!data) {
            if (!categorizeDataRequest.isMutating) {
                categorizeDataRequest.trigger("");
            }
            return;
        }

        const initData = {
            id: data.id,
            title: data.title,
            content: data.desc,
            selectedCatId: data.cat_id,
            imgSrc: data.image_path,
        };
        const initDataEmpty = Object.keys(initData).length === 0;
        if (initDataEmpty) {
            categorizeDataRequest.trigger("");
            return;
        }
        setInitData(initData);

        // image
        if (initData.imgSrc != "") {
            setFiles([
                {
                    source: initData.imgSrc,
                },
            ]);
        }

        if (initData.selectedCatId) {
            categorizeDataRequest.trigger(initData.selectedCatId);
        }

        if (initData.title !== "") {
            !titleEditor.isDestroyed &&
                titleEditor?.commands.setContent(initData.title);
        }

        if (initData.content !== "") {
            !contentEditor.isDestroyed &&
                contentEditor?.commands.setContent(initData.content);
        }

        return;
    }, [router.isReady, titleEditor, contentEditor, data]);

    const [initData, setInitData] = useState<EditPostPara | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [fileIsGIF, setFileIsGIF] = useState<boolean>(false);

    // cropper
    const [image, setImage] = useState<string | null>(null);
    const [cropData, setCropData] = useState("#");
    const [thumbnailCropData, setThumbnailCropData] = useState("#");
    const [cropper, setCropper] = useState<any>();
    const [thumbnailCropper, setThumbnailCropper] = useState<any>();

    // steper
    const [active, setActive] = useState(0);

    // selector
    const [catData, setCatData] = useState<any[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [gloableError, setGloableError] = useState<string | null>(null);

    // cat requests
    const categorizeDataRequest = useSWRMutation(
        "/api/get/categorize",
        (url, { arg }) =>
            createFetcher(url).then((data) => {
                if (!data.error) {
                    setCatData(data);
                    if (arg != "") {
                        setValue(arg.toString());
                    }
                }
                return data;
            })
    );

    // new cat requests
    const createCategorizeRequest = useSWRMutation(
        "/api/post/create_cat",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    const item = {
                        value: data.id.toString(),
                        label: data.section.toUpperCase(),
                    };
                    setCatData((current) => [...current, item]);
                    setValue(item.value);
                }
                return data;
            })
    );

    // post requests
    const postRequest = useSWRMutation(
        "/api/post/upload_post",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    Router.push("/dashboard");
                }
            })
    );

    // post requests
    const editPostRequest = useSWRMutation(
        "/api/post/edit_post",
        (url, { arg }) =>
            createFetcher(url, arg).then((data) => {
                if (!data.error) {
                    Router.push("/dashboard");
                }
            })
    );

    // segement
    const [segmentedValue, setSegmentedValue] = useState("Free");
    function converSegmentedToRatio(value: string) {
        if (value === "1:1") {
            return 1;
        } else if (value === "16:9") {
            return 16 / 9;
        } else if (value === "A4") {
            return 210 / 297;
        } else if (value === "Card") {
            return 4 / 6;
        } else if (value === "Post") {
            return 18 / 24;
        }

        return NaN;
    }

    // MARK: step
    function handleContextStep(event: React.MouseEvent<HTMLElement>) {
        if (!value) {
            waringNotification("Missing field", "Categorize");
            setGloableError("Categorize not set");
            return;
        }

        if (titleEditor?.isEmpty) {
            waringNotification("Missing field", "Title");
            setGloableError("Require Title");
            return;
        }

        setGloableError(null);
        const step = active + 1;
        setActive(step);
    }

    function handleFileStep(event: React.MouseEvent<HTMLElement>) {
        if (!image) {
            waringNotification("Missing field", "File not select");
            setGloableError("File not select");
            return;
        }

        setGloableError(null);
        setActive(active + 1);
    }

    function handleCropStep(event: React.MouseEvent<HTMLElement>) {
        if (fileIsGIF) {
            setCropData(image ?? "");
        } else if (typeof cropper !== "undefined") {
            setCropData(
                cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.9)
            );
        }
        if (typeof thumbnailCropper !== "undefined") {
            setThumbnailCropData(
                thumbnailCropper.getCroppedCanvas().toDataURL("image/jpeg", 0.9)
            );
        }
        // setOpened(true);
        setGloableError(null);
        setActive(active + 1);
    }

    function handlePostStep(event: React.MouseEvent<HTMLElement>) {
        setUnsavedChanges(false);
        const param = JSON.stringify({
            image_data_url: cropData,
            nail_image_data_url: thumbnailCropData,
            title: titleEditor?.getHTML() ?? "",
            cat_id: value,
            description: contentEditor?.getHTML() ?? "",
            id: initData?.id?.toString(),
        });
        if (initData?.id) {
            editPostRequest.trigger(param);
        } else {
            postRequest.trigger(param);
        }
    }

    const { open, isOpen } = useDropboxChooser({
        appKey: "r7swpbyqksavenz",
        chooserOptions: {
            // default: 'preview'
            linkType: "direct",
            // default: false
            multiselect: false,
            extensions: ["images"],
        },
        onSelected: (files) => {
            files.length > 0 &&
                files[0].link &&
                setFiles([
                    {
                        source: files[0].link,
                    },
                ]);
        },
        onCanceled: () => {},
    });

    return (
        <div id="top">
            <div className="p-8 flex flex-col">
                {gloableError && (
                    <Alert
                        className="text-xl mb-10"
                        icon={<IconAlertCircle size={16} />}
                        title={`😩🍆🍑💦  ${gloableError}`}
                        color="red"
                    >
                        {}
                    </Alert>
                )}
                <Stepper
                    active={active}
                    onStepClick={(step) => {
                        if (step < active) {
                            setActive(step);
                        }
                    }}
                    breakpoint="sm"
                >
                    <Stepper.Step label="Context" className="uppercase">
                        <Title title="Select your categorize" />
                        <Select
                            className=""
                            value={value}
                            data={catData}
                            placeholder="SELECT CATEGORIZE"
                            nothingFound="Nothing found"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onChange={(value) => {
                                setUnsavedChanges(true);
                                setValue(value);
                            }}
                            onCreate={(query) => {
                                createCategorizeRequest.trigger(
                                    JSON.stringify({
                                        section: query,
                                    })
                                );
                                return value;
                            }}
                            onDropdownOpen={() => {}}
                            dropdownComponent="div"
                            inputContainer={(child: React.ReactNode) => {
                                if (categorizeDataRequest.isMutating) {
                                    return <Loader />;
                                }
                                if (categorizeDataRequest.error) {
                                    setGloableError(
                                        categorizeDataRequest.error
                                    );
                                }
                                if (createCategorizeRequest.isMutating) {
                                    return (
                                        <div className="relative">
                                            <div className="pr-10">{child}</div>
                                            <Loader className="absolute bottom-0 right-0" />
                                        </div>
                                    );
                                }
                                if (
                                    categorizeDataRequest.data ||
                                    createCategorizeRequest.data
                                ) {
                                    return child;
                                }
                            }}
                        />
                        <Title title="Detail title" />
                        <PostEditor editor={titleEditor}></PostEditor>
                        <Title title="Detail description" />
                        <PostEditor editor={contentEditor}></PostEditor>
                        <NextButton title="NEXT" click={handleContextStep} />
                    </Stepper.Step>

                    <Stepper.Step label="File" className="uppercase">
                        <Title title="Select your hard work" />
                        <button
                            className="mb-4 btn btn-xs rounded-none text-white border-none"
                            onClick={open}
                            disabled={isOpen}
                        >
                            <IconBox></IconBox>
                            Choose from Dropbox
                        </button>
                        <FilePond
                            acceptedFileTypes={["image/*"]}
                            imagePreviewMinHeight={80}
                            credits={false}
                            allowProcess={false}
                            imagePreviewMarkupShow={true}
                            instantUpload={false}
                            files={files}
                            onaddfile={(err, item: any) => {
                                if (err) {
                                    console.warn(err);
                                    return;
                                }

                                setFileIsGIF(item.filename.includes("gif"));

                                if (item) {
                                    setImage(item.getFileEncodeDataURL());
                                }
                            }}
                            onupdatefiles={(fileItems: FilePondFile[]) => {
                                setFiles(fileItems);
                                if (fileItems.length <= 0) {
                                    setImage(null);
                                    setFileIsGIF(false);
                                    return;
                                }
                                setUnsavedChanges(true);
                            }}
                            // allowFileEncode={true}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files" /* sets the file input name, it's filepond by default */
                            labelIdle='<div class="text-5xl font-bold">Drag & Drop your files or <span class="filepond--label-action">Browse</span></div>'
                        />
                        <NextButton title="NEXT" click={handleFileStep} />
                    </Stepper.Step>
                    {
                        <Stepper.Step label="Crop" className=" uppercase">
                            <Title title="Crop your shit here" />
                            {fileIsGIF && (
                                <div className="flex text-yellow-500">
                                    <IconExclamationCircle
                                        size={16}
                                        className="mr-2"
                                    />
                                    <InnerTitle title="GIF only support crop thumbnail" />
                                </div>
                            )}
                            <div className="flex flex-col lg:flex-row gap-4 ">
                                {!fileIsGIF && (
                                    <div className="relative flex-1 border-dashed border border-base-content rounded-xl p-4">
                                        <InnerTitle title="Detail Image" />

                                        <Cropper
                                            className="relative"
                                            dragMode="move"
                                            aspectRatio={converSegmentedToRatio(
                                                segmentedValue
                                            )}
                                            scalable={false}
                                            preview=".detail"
                                            src={image ?? ""}
                                            viewMode={2}
                                            minCropBoxHeight={10}
                                            minCropBoxWidth={10}
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={false}
                                            onInitialized={(instance) => {
                                                setCropper(instance);
                                            }}
                                            guides={true}
                                        />
                                        {image && (
                                            <SegmentedControl
                                                className="absolute inset-x-12 bottom-0 mt-2"
                                                size="xs"
                                                value={segmentedValue}
                                                onChange={(v) => {
                                                    setSegmentedValue(v);
                                                    cropper.setAspectRatio(
                                                        converSegmentedToRatio(
                                                            v
                                                        )
                                                    );
                                                }}
                                                data={[
                                                    {
                                                        label: "Free",
                                                        value: "Free",
                                                    },
                                                    {
                                                        label: "1:1",
                                                        value: "1:1",
                                                    },
                                                    {
                                                        label: "16:9",
                                                        value: "16:9",
                                                    },
                                                    {
                                                        label: "A4",
                                                        value: "A4",
                                                    },
                                                    {
                                                        label: "Card",
                                                        value: "Card",
                                                    },
                                                    {
                                                        label: "Post",
                                                        value: "Post",
                                                    },
                                                ]}
                                            />
                                        )}

                                        <Cropper />
                                    </div>
                                )}

                                <div className="flex flex-col flex-1 border-dashed border border-base-content rounded-xl p-4">
                                    <InnerTitle title="Thumbnail" />
                                    <Cropper
                                        dragMode="move"
                                        aspectRatio={1}
                                        preview=".nail"
                                        src={image ?? ""}
                                        viewMode={0}
                                        minCropBoxHeight={10}
                                        minCropBoxWidth={10}
                                        background={false}
                                        responsive={true}
                                        autoCropArea={1}
                                        checkOrientation={false}
                                        onInitialized={(instance) => {
                                            setThumbnailCropper(instance);
                                        }}
                                        guides={true}
                                    />
                                </div>
                            </div>
                            {image && (
                                <div className="flex flex-col flex-1 gap-4">
                                    {!fileIsGIF && (
                                        <div className="flex flex-col flex-1">
                                            <Title title="Detail preview" />
                                            <div className="flex place-content-center place-items-center bg-base-200 rounded-lg p-4">
                                                <div className="detail overflow-hidden w-full float-center h-[640px] place-content-center" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col flex-1">
                                        <Title title="Section preview" />
                                        <div className="mx-auto px-4 py-8 bg-base-200 rounded-lg w-[100%]">
                                            <div className="uppercase pb-4 pl-4 prose">
                                                <h2>
                                                    {
                                                        catData.filter(
                                                            (item) => {
                                                                return (
                                                                    item.value ===
                                                                    value
                                                                );
                                                            }
                                                        )[0].label
                                                    }
                                                </h2>
                                            </div>
                                            <div className="gap-y-2 gap-x-2 grid grid-cols-4 md:grid-cols-7 lg:flex lg:flex-wrap  p-2">
                                                {Array(10)
                                                    .fill(0)
                                                    .map((v, i) => i)
                                                    .map((value) => {
                                                        return (
                                                            <div
                                                                key={value}
                                                                className="nail w-[100%] aspect-1 lg:w-[15%] lg:max-w-[90px] overflow-hidden"
                                                            />
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <NextButton title="NEXT" click={handleCropStep} />
                        </Stepper.Step>
                    }
                    <Stepper.Step label="Confirm" className="uppercase">
                        <Title title="final result" />
                        <DetailPreview
                            src={cropData}
                            nailSrc={thumbnailCropData}
                            title={titleEditor?.getHTML() ?? ""}
                            desc={contentEditor?.getHTML() ?? ""}
                        />
                        <NextButton
                            title={initData?.id ? "Save edit" : "Upload post"}
                            click={handlePostStep}
                        />
                    </Stepper.Step>
                </Stepper>
            </div>
        </div>
    );

    // MARK: conpoments
    function Title(props: { title: string }) {
        return <h4 className="prose uppercase my-2">{props.title}</h4>;
    }

    function InnerTitle(props: { title: string }) {
        return (
            <h1 className="prose-sm base-300 uppercase h-9">{props.title}</h1>
        );
    }
};

export default PostEditPage;
