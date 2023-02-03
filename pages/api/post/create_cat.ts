import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";

interface BodyArgument {
    section: string;
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            let body: BodyArgument = req.body;

            if (!body.section) {
                res.status(500);
                break;
            }

            const contain = await prisma.categorize.findFirst({
                where: {
                    section: body.section,
                },
            });

            if (contain) {
                res.json(contain);
                break;
            }

            const result = await prisma.categorize.create({
                data: {
                    section: body.section,
                },
            });

            res.json(result);
            break;
        default:
            res.status(405);
            break;
    }
}
