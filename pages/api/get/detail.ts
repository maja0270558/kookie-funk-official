import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../api/db";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            const id: number = parseInt(req.query.id as string);
            if (id) {
                const result = await prisma.works.findFirst({
                    where: {
                        id: id,
                    },
                });

                const othersResult = await prisma.works.findMany({
                    where: {
                        NOT: {
                            id: id,
                        },
                    },
                    take: 100,
                });

                const otherPosts = othersResult.map((work) => {
                    return {
                        img: work.image_path,
                        id: work.id,
                    };
                });

                if (result) {
                    res.status(200).json({
                        post: {
                            title: result.title,
                            description: result.desc,
                            image: result.image_path,
                        },
                        others: otherPosts,
                    });
                } else {
                    res.status(500).json({
                        error: "There nothing here.",
                    });
                }
            } else {
                res.status(500).json({ error: "There nothing here." });
            }
            return;
        default:
            res.status(500);
    }
}
