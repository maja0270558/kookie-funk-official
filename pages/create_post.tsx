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
import TipTapEditor from "../components/TipTapEditor";

const create_post = () => {
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

    return (
        <div className="p-8 flex flex-col gap-10">
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="Context" className="uppercase">
                    <h1 className="prose">Select your Categorize</h1>
                    <Select
                        placeholder="Pick one"
                        data={[
                            { value: "react", label: "React" },
                            { value: "ng", label: "Angular" },
                            { value: "svelte", label: "Svelte" },
                            { value: "vue", label: "Vue" },
                        ]}
                    />
                    <h1 className="prose">Title</h1>
                    {/* <TipTapEditor /> */}
                    <h1 className="prose">desc</h1>
                </Stepper.Step>

                <Stepper.Step label="File" className="uppercase">
                    <h1 className="prose">Select your hard work</h1>
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
                    <div className="flex place-content-end">
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
                    <h1 className="prose">Crop your shit here</h1>
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
                                preview=".img-preview1"
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
                        <div className="mx-auto px-4 py-8 bg-slate-100 rounded-lg mt-8">
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
                    )}
                    <div className="flex place-content-end mt-3">
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
