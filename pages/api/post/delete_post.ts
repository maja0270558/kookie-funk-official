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
                const error = validate.errors[0].message;
                return res.json({
                    error: error,
                });
            }

            const publicId = await prisma.works.findFirst({
                where: {
                    id: parseInt(body.id),
                },
                select: {
                    public_image_id: true,
                },
            });

            const id = publicId;
            const removeimageRes = await cloudinary.v2.api
                .delete_resources([`works/${id}`, `thumbnails/${id}`])
                .then(async () => {
                    const result = await prisma.works.delete({
                        where: {
                            id: parseInt(body.id),
                        },
                    });
                    if (result) {
                        return { return_code: "0000" };
                    } else {
                        return { error: "Delete prisma fail" };
                    }
                })
                .catch((err) => {
                    res.status(500).json({ error: "Uppload fail" });
                    console.log(err);
                });

            return res.status(200).json(removeimageRes);
        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
