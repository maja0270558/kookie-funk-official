import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import Validator from "jsonschema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ error: "You must be logged in." });
        return;
    }

    switch (req.method) {
        case "POST":
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
                const error = validate.errors[0].stack;
                return res.json({
                    error: error,
                });
            }

            try {
                let id = getRandomId();

                const imageCldRes = await cloudinary.v2.uploader.upload(
                    body.image_data_url,
                    { public_id: `works/${id}` }
                );
                const nailImageCldRes = await cloudinary.v2.uploader.upload(
                    body.nail_image_data_url,
                    { public_id: `thumbnails/${id}` }
                );
                const imageURL = imageCldRes.secure_url;
                const nailImageURL = nailImageCldRes.secure_url;

                if (imageURL !== "" && nailImageURL !== "") {
                    await prisma.works.create({
                        data: {
                            title: body.title,
                            image_path: imageURL,
                            nail_image_path: nailImageURL,
                            desc: body.description,
                            display: 1,
                            cat_id: parseInt(body.cat_id),
                            public_image_id: id,
                        },
                    });
                }

                return res.status(200).json({ return_code: "0000" });
            } catch (error) {
                return res
                    .status(500)
                    .json({ error: `Post fail because ${error}` });
            }

        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
