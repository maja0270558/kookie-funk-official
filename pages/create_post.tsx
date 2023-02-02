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

const create_post = () => {
    // filepond
    const [files, setFiles] = useState([]);
    // cropper
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState<any>();
    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    return (
        <div className="p-8 flex flex-col">
            <h2>Select your hard work</h2>
            <FilePond
                imagePreviewMinHeight={80}
                credits={false}
                allowProcess={false}
                imagePreviewMarkupShow={true}
                instantUpload={false}
                files={files}
                onupdatefiles={(fileItems) => {
                    console.log("😘");
                    if (fileItems.length > 0) {
                        setImage(URL.createObjectURL(fileItems[0].file) as any);
                        setFiles(fileItems);
                    }
                }}
                allowMultiple={false}
                maxFiles={1}
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='<div class="text-5xl font-bold">Drag & Drop your files or <span class="filepond--label-action">Browse</span></div>'
            />
            <div className="bg-white">
                <Cropper
                    style={{ height: "100%", width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
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
