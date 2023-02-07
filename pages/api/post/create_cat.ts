import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

interface BodyArgument {
    section: string;
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
