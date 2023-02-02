import React from "react";
import Error from "next/error";

import { useState } from "react";

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

const create_post = () => {
    const [files, setFiles] = useState([]);

    return (
        <div className="p-8">
            <FilePond
                imagePreviewMinHeight={80}
                credits={false}
                allowProcess={false}
                imagePreviewMarkupShow={true}
                instantUpload={false}
                files={files}
                onupdatefiles={(fileItems) => {}}
                allowMultiple={false}
                maxFiles={1}
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='<div class="text-5xl font-bold">Drag & Drop your files or <span class="filepond--label-action">Browse</span></div>'
            />
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
