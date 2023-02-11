import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

export interface WorkImageData {
    img: string;
    id: number;
}

export interface WorksData {
    section_name: string;
    imgs: WorkImageData[];
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const works = await prisma.works.findMany({
            include: {
                categorize: true, // Return all fields
            },
        });

        return res.json(works);
    } catch (e) {
        return res.status(500).json({
            error: `OMG ${e}`,
        });
    }
}
