import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";
import cloudinary from "cloudinary";

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

            if (!body.id) {
                return res.status(500).json({ error: "id empty" });
            }

            try {
                const publicIdObject = await prisma.works.findMany({
                    where: {
                        cat_id: parseInt(body.id),
                    },
                    select: {
                        public_image_id: true,
                    },
                });
                const deletedTarget: string[] = [];
                const publicIds = publicIdObject.map((v) => v.public_image_id);
                publicIds.forEach((v) => {
                    deletedTarget.push(`works/${v}`);
                    deletedTarget.push(`thumbnails/${v}`);
                });

                if (deletedTarget.length > 0) {
                    await cloudinary.v2.api.delete_resources(deletedTarget);
                }

                await prisma.categorize.delete({
                    where: {
                        id: parseInt(body.id),
                    },
                });
                return res.json({ return_code: "0000" });
            } catch (e) {
                return res.status(500).json({
                    error: `Delete fail because ${e}`,
                });
            }

        default:
            return res.status(500).json({ error: "HTTP method incorrect" });
    }
}
