import { prisma } from "../../api/db";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

export interface CatData {
    value: string;
    label: string;
    id: number;
}
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cats = await prisma.categorize.findMany();
    const data: CatData[] = [];

    cats.forEach((cat) => {
        data.push({
            value: cat.section,
            label: cat.section,
            id: cat.id,
        });
    });
    res.json(data);
}
