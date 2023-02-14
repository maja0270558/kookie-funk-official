import { prisma } from "../../api/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id: number = parseInt(req.query.id as string);
        const work = await prisma.works.findFirst({
            where: {
                id: id,
            },
        });

        return res.json(work);
    } catch (e) {
        return res.status(500).json({
            error: `OMG ${e}`,
        });
    }
}
