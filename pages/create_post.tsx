import React from "react";
import Error from "next/error";

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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// -------------------
// react cropper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import GalleryImage from "../components/GalleryImage";
// steper
import { Stepper, Select } from "@mantine/core";
// editor
import { Editor } from "@tiptap/react";
import editor from "../components/TipTapEditor";
import PostEditor from "../components/RichTextEditor";
import { constant } from "lodash";
// alert
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
// segement
import { SegmentedControl } from "@mantine/core";

const create_post = () => {
    const titleEditor: Editor | null = editor();
    const contentEditor: Editor | null = editor();

    // filepond
    const [files, setFiles] = useState([]);
    // cropper
    const [image, setImage] = useState<string | null>(null);
    const [cropData, setCropData] = useState("#");
    const [thumbnailCropData, setThumbnailCropData] = useState("#");

    const [cropper, setCropper] = useState<any>();
    const [thumbnailCropper, setThumbnailCropper] = useState<any>();

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const getThumbnailCropData = () => {
        if (typeof thumbnailCropper !== "undefined") {
            setCropData(thumbnailCropper.getCroppedCanvas().toDataURL());
        }
    };

    // steper
    const [active, setActive] = useState(2);
    // selector

    const [data, setData] = useState([
        { value: "react", label: "React" },
        { value: "ng", label: "Angular" },
    ]);
    const [value, setValue] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // segement
    const [segmentedValue, setSegmentedValue] = useState("free");
    const [ratioValue, setRatioValue] = useState(16 / 9);

    function converSegmentedToRatio(value: string) {
        if (value === "1") {
            return 1;
        } else if (value === "169") {
            return 16 / 9;
        }

        return NaN;
    }

    function Title(props: { title: string }) {
        return <h4 className="prose uppercase my-2">{props.title}</h4>;
    }

    function InnerTitle(props: { title: string }) {
        return (
            <h1 className="prose-sm base-300 uppercase h-9">{props.title}</h1>
        );
    }

    function NextButton(props: {
        click: (e: React.MouseEvent<HTMLElement>) => void;
    }) {
        return (
            <div className="flex place-content-end mt-4">
                <button
                    className="uppercase btn btn-primary"
                    onClick={props.click}
                >
                    {"Next"}
                </button>
            </div>
        );
    }

    function handleContextStep(event: React.MouseEvent<HTMLElement>) {
        if (!value) {
            setError("Categorize not set");
            return;
        }
        setError(null);
        setActive(active + 1);
    }

    function handleFileStep(event: React.MouseEvent<HTMLElement>) {
        if (!image) {
            setError("File not select");
            return;
        }
        setError(null);
        setActive(active + 1);
    }

    return (
        <div className="p-8 flex flex-col">
            {error && (
                <Alert
                    className="text-xl mb-10"
                    icon={<IconAlertCircle size={16} />}
                    title="🫵😩🍆🍑💦 Something you forgot here"
                    color="red"
                >
                    <p> {error} </p>
                </Alert>
            )}

            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="Context" className="uppercase">
                    <Title title="Select your categorize" />
                    <Select
                        value={value}
                        data={data}
                        placeholder="Select categorize"
                        nothingFound="Nothing found"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onChange={setValue}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            setData((current) => [...current, item]);
                            return item;
                        }}
                        dropdownComponent="div"
                    />
                    <Title title="Detail title" />
                    <PostEditor editor={titleEditor}></PostEditor>
                    <Title title="Detail description" />
                    <PostEditor editor={contentEditor}></PostEditor>
                    <NextButton click={handleContextStep} />
                </Stepper.Step>

                <Stepper.Step label="File" className="uppercase">
                    <Title title="Select your hard work" />
                    <FilePond
                        imagePreviewMinHeight={80}
                        credits={false}
                        allowProcess={false}
                        imagePreviewMarkupShow={true}
                        instantUpload={false}
                        files={files}
                        onupdatefiles={(fileItems: any) => {
                            setFiles(fileItems);
                            if (fileItems.length <= 0) {
                                setImage(null);
                                return;
                            }
                            setImage(
                                URL.createObjectURL(fileItems[0].file) as any
                            );
                        }}
                        allowMultiple={false}
                        maxFiles={1}
                        name="files" /* sets the file input name, it's filepond by default */
                        labelIdle='<div class="text-5xl font-bold">Drag & Drop your files or <span class="filepond--label-action">Browse</span></div>'
                    />
                    <NextButton click={handleFileStep} />
                </Stepper.Step>
                <Stepper.Step label="Crop" className=" uppercase">
                    <Title title="Crop your shit here" />
                    <div className="flex flex-row gap-4 ">
                        <div className="relative flex-1 border-dashed border border-base-content rounded-xl p-4">
                            <InnerTitle title="Detail Image" />

                            <Cropper
                                className=" relative"
                                dragMode="move"
                                aspectRatio={NaN}
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
                            <SegmentedControl
                                className="absolute inset-x-12 bottom-0 mt-2"
                                size="xs"
                                value={segmentedValue}
                                onChange={(v) => {
                                    setSegmentedValue(v);
                                    cropper.setAspectRatio(
                                        converSegmentedToRatio(v)
                                    );
                                }}
                                data={[
                                    { label: "Free", value: "free" },
                                    { label: "1:1", value: "1" },
                                    { label: "16:9", value: "169" },
                                ]}
                            />
                            <Cropper />
                        </div>

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
                        <div className="flex flex-row flex-1 gap-4">
                            <div className="flex flex-col flex-1">
                                <Title title="Detail preview" />
                                <div className="flex place-content-center place-items-center bg-base-200 rounded-lg p-4">
                                    <div className="detail overflow-hidden w-full float-center h-[640px] place-content-center" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-1">
                                <Title title="Section preview" />
                                <div className="mx-auto px-4 py-8 bg-base-200 rounded-lg w-[100%]">
                                    <div className="uppercase pb-4 pl-4 prose">
                                        <h2>{value}</h2>
                                    </div>
                                    <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                                            return (
                                                <div className="nail overflow-hidden bg-slate-400 w-full float-left h-52" />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <NextButton click={(e) => {}} />
                </Stepper.Step>
                <Stepper.Step
                    label="Confirm"
                    className="uppercase"
                ></Stepper.Step>
                <Stepper.Step label="Text" className="uppercase"></Stepper.Step>
                <Stepper.Step label="Desc" className="uppercase"></Stepper.Step>
            </Stepper>
        </div>
    );
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">There's nothing here</h1>
                    <p className="py-6">
                        已乃僧忽他出，數日不返，探其篋笥，空空如也。
                    </p>
                    <button className="btn btn-primary">Back to home</button>
                </div>
            </div>
        </div>
    );
};

export default create_post;
