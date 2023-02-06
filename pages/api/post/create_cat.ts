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
                return res.status(500).json({ error: "Section empty" });
            }

            const contain = await prisma.categorize.findFirst({
                where: {
                    section: body.section,
                },
            });

            if (contain) {
                return res.json(contain);
            }

            const result = await prisma.categorize.create({
                data: {
                    section: body.section,
                },
            });

            return res.json(result);
        default:
            return res.status(500).json({ error: "HTTP method incorrect" });
    }
}
