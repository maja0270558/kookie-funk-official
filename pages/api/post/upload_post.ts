import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import Validator from "jsonschema";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "100mb",
        },
    },
};
interface BodyArgument {
    image_data_url: string;
    nail_image_data_url: string;
    title: string;
    description: string;
    cat_id: string;
}

function getRandomId() {
    return Date.now() + (Math.random() * 100000).toFixed();
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            return res.status(200).json({ return_code: "0000" });
            let body: BodyArgument = req.body;
            // Address, to be embedded on Person
            var postSchema = {
                type: "object",
                properties: {
                    image_data_url: { type: "string" },
                    nail_image_data_url: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    cat_id: { type: "string" },
                },
                required: [
                    "image_data_url",
                    "nail_image_data_url",
                    "title",
                    "cat_id",
                ],
            };
            const validate = Validator.validate(body, postSchema);

            if (!validate.valid) {
                const error = validate.errors[0].message;
                return res.json({
                    error: error,
                });
            }

            let id = getRandomId();

            // Upload
            const imageCldRes = cloudinary.v2.uploader.upload(
                body.image_data_url,
                { public_id: `works/${id}` }
            );
            const nailImageCldRes = cloudinary.v2.uploader.upload(
                body.nail_image_data_url,
                { public_id: `thumbnails/${id}` }
            );

            Promise.all([imageCldRes, nailImageCldRes])
                .then(function (valArray) {
                    return {
                        imageURL: valArray[0].secure_url,
                        nailImageURL: valArray[1].secure_url,
                    };
                })
                .then(async (value) => {
                    const result = await prisma.works.create({
                        data: {
                            title: body.title,
                            image_path: value.imageURL,
                            nail_image_path: value.nailImageURL,
                            desc: body.description,
                            display: 1,
                            cat_id: parseInt(body.cat_id),
                            public_image_id: id,
                        },
                    });

                    return res.status(200).json({
                        return_code: "0000",
                    });
                })
                .catch((err) => {
                    res.status(500).json({ error: "Uppload fail" });
                    console.log(err);
                });
            return;
        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
