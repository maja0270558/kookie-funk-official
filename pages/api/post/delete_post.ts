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
    id: string;
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
            console.log("🦤🦤🦤🦤🦤");
            let body: BodyArgument = req.body;
            var postSchema = {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            };
            const validate = Validator.validate(body, postSchema);

            if (!validate.valid) {
                const error = validate.errors[0].stack;
                return res.json({
                    error: error,
                });
            }

            try {
                const publicId = await prisma.works.findFirst({
                    where: {
                        id: parseInt(body.id),
                    },
                    select: {
                        public_image_id: true,
                    },
                });

                const id = publicId?.public_image_id;
                await cloudinary.v2.uploader.destroy(`works/${id}`);
                await cloudinary.v2.uploader.destroy(`thumbnails/${id}`);

                await prisma.works.delete({
                    where: {
                        id: parseInt(body.id),
                    },
                });

                return res.status(200).json({ return_code: "0000" });
            } catch (error) {
                return res
                    .status(500)
                    .json({ error: `Delete post fail because ${error}` });
            }

        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
