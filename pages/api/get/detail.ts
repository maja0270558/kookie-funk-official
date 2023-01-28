import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            const id = req.query.id;
            if (id) {
                const result = await prisma.works.findFirst({
                    where: {
                        id: Number(id),
                    },
                });

                if (result) {
                    res.status(200).json({
                        post: result
                    });
                } else {
                    res.status(200).json({
                        error: "No such post",
                    });
                }
            } else {
                res.status(200).json({ error: "Invalid request para" });
            }
        default:
            res.status(405).end("Invalid request type");
            break;
    }
}
