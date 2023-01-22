import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    interface WorksData {
        section_name: string;
        imgs: { img: string, id: number }[];
    }

    const works = await prisma.works.findMany();
    const worksById = _.groupBy(works, 'cat_id');

    const cats = await prisma.categorize.findMany()
    const data: WorksData[] = []

    cats.forEach((cat) => {
        let seperateWork = worksById[cat.id]
        if (seperateWork) {
            const imageData = seperateWork.map((work) => {
                return {
                    img: work.image_path!,
                    id: work.id
                }
            })
            data.push(
                {
                    section_name: cat.section,
                    imgs: imageData
                }
            )
        }
    });

    res.json({
        data
    });
}
