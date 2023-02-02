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

const create_post = () => {
    const titleEditor: Editor | null = editor();
    const contentEditor: Editor | null = editor();

    // filepond
    const [files, setFiles] = useState([]);
    // cropper
    const [image, setImage] = useState("");
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
    const [active, setActive] = useState(0);
    // selector

    const [data, setData] = useState([
        { value: "react", label: "React" },
        { value: "ng", label: "Angular" },
    ]);
    const [value, setValue] = useState<string | null>(null);

    function Title(props: { title: string }) {
        return <h4 className="prose uppercase my-2">{props.title}</h4>;
    }

    return (
        <div className="p-8 flex flex-col">
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="Context" className="uppercase">
                    <Title title="Select your categorize" />
                    <Select
                        value={value}
                        data={data}
                        placeholder="Select items"
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
                    <div className="flex place-content-end mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setActive(active + 1);
                            }}
                        >
                            Next
                        </button>
                    </div>
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
                            console.log("😘");
                            if (fileItems.length > 0) {
                                setImage(
                                    URL.createObjectURL(
                                        fileItems[0].file
                                    ) as any
                                );
                                setFiles(fileItems);
                            }
                        }}
                        allowMultiple={false}
                        maxFiles={1}
                        name="files" /* sets the file input name, it's filepond by default */
                        labelIdle='<div class="text-5xl font-bold">Drag & Drop your files or <span class="filepond--label-action">Browse</span></div>'
                    />
                    <div className="flex place-content-end mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setActive(active + 1);
                            }}
                        >
                            Next
                        </button>
                    </div>
                </Stepper.Step>
                <Stepper.Step label="Crop" className=" uppercase">
                    <Title title="Crop your shit here" />
                    <div className="flex flex-row gap-4">
                        <div className="flex-1 border-dashed border border-base-content rounded-xl p-4">
                            <h1 className="prose-sm base-300 uppercase">
                                Detail Image
                            </h1>

                            <Cropper
                                dragMode="move"
                                scalable={false}
                                // style={{ height: "100%", width: "100%" }}
                                // zoomTo={0.5}
                                // initialAspectRatio={1}
                                preview=".detail"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                        </div>

                        <div className="flex flex-col flex-1 border-dashed border border-base-content rounded-xl p-4">
                            <h1 className="prose-sm base-300 uppercase">
                                Thumbnail
                            </h1>

                            <Cropper
                                // style={{ height: "100%", width: "100%" }}
                                // zoomTo={0.5}
                                // initialAspectRatio={1}
                                dragMode="move"
                                aspectRatio={1}
                                preview=".nail"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                onInitialized={(instance) => {
                                    setThumbnailCropper(instance);
                                }}
                                guides={true}
                            />
                        </div>
                    </div>
                    {image != "" && (
                        <div className="flex flex-col">
                            <Title title="Detail preview" />
                            <div
                                className="detail overflow-hidden"
                                style={{
                                    width: "100%",
                                    float: "left",
                                    height: "200px",
                                }}
                            />

                            <Title title="Section preview" />
                            <div className="mx-auto px-4 py-8 bg-base-200 rounded-lg mt-2 w-[100%]">
                                <div className="uppercase pb-4 pl-4 prose">
                                    <h2>{"Section Preview"}</h2>
                                </div>
                                <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                                    {[
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                        13, 14,
                                    ].map(() => {
                                        return (
                                            <div
                                                className="nail overflow-hidden"
                                                style={{
                                                    width: "100%",
                                                    float: "left",
                                                    height: "200px",
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* {image != "" && <Title title="Detail preview" />}
                    {image != "" && (
                        <div
                            className="detail overflow-hidden"
                            style={{
                                width: "100%",
                                float: "left",
                                height: "200px",
                            }}
                        />
                    )}
                    {image != "" && <Title title="Section preview" />}

                    {image != "" && (
                        <div className="mx-auto px-4 py-8 bg-base-200 rounded-lg mt-2">
                            <div className="uppercase pb-4 pl-4 prose">
                                <h2>{"Section Preview"}</h2>
                            </div>
                            <div className="gap-y-4 gap-x-4 grid grid-cols-fill">
                                {[
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                                    14,
                                ].map(() => {
                                    return (
                                        <div
                                            className="nail overflow-hidden"
                                            style={{
                                                width: "100%",
                                                float: "left",
                                                height: "200px",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )} */}

                    <div className="flex place-content-end mt-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setActive(active + 1);
                            }}
                        >
                            Next
                        </button>
                    </div>
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
