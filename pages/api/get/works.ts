import { prisma } from "../../api/db";
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
            where: {
                display: 1,
            },
            orderBy: [{ ts: "desc" }],
        });
        const worksById = _.groupBy(works, "cat_id");

        const cats = await prisma.categorize.findMany();
        const data: WorksData[] = [];

        cats.forEach((cat) => {
            let seperateWork = worksById[cat.id];
            if (seperateWork) {
                const imageData = seperateWork.map((work) => {
                    return {
                        img: work.nail_image_path!,
                        id: work.id,
                    };
                });

                data.push({
                    section_name: cat.section,
                    imgs: imageData,
                });
            }
        });
        return res.json(data);
    } catch (e) {
        return res.status(500).json({
            error: `OMG ${e}`,
        });
    }
}
