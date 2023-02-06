import { prisma } from "../../api/db";
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

export interface CatData {
    value: string;
    label: string;
}
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cats = await prisma.categorize.findMany();
    const data: CatData[] = [];

    cats.forEach((cat) => {
        data.push({
            value: cat.id.toString(),
            label: cat.section,
        });
    });
    res.json(data);
}
