import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await prisma.works.create({
        data: {
            title: "my first data2",
            image_path: "https//:ioumage.com",
            nail_image_path: "https//:ioumage.com.nail",
            desc: "HERE COMES THE DESCRIPTION",
        },
    });

    res.json(result);
}
