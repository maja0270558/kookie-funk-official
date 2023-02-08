import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

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
                await prisma.categorize.delete({
                    where: {
                        id: parseInt(body.id),
                    },
                });
                return res.json({ return_code: "0000" });
            } catch (e) {
                return res.status(500).json({
                    error: "prisma delete error",
                });
            }

        default:
            return res.status(500).json({ error: "HTTP method incorrect" });
    }
}
