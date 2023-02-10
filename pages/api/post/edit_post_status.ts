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
    display: string;
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
                    display: { type: "string" },
                    id: { type: "string" },
                },
                required: ["display", "id"],
            };
            const validate = Validator.validate(body, postSchema);

            if (!validate.valid) {
                const error = validate.errors[0].stack;
                return res.json({
                    error: error,
                });
            }

            try {
                await prisma.works.update({
                    where: {
                        id: parseInt(body.id),
                    },
                    data: {
                        display: parseInt(body.display),
                    },
                });

                return res.status(200).json({ return_code: "0000" });
            } catch (error) {
                return res
                    .status(500)
                    .json({ error: `Edit post fail because ${error}` });
            }
        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
