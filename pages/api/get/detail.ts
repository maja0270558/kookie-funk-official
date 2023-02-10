import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../../api/db";
import { authOptions } from "../auth/[...nextauth]";
import works from "../../detail/[id]";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    switch (req.method) {
        case "GET":
            const id: number = parseInt(req.query.id as string);
            if (!id) {
                return res.status(500).json({
                    error: `id not exist`,
                });
            }
            try {
                let filter: any;
                let otherResultFilter: any;

                if (session) {
                    filter = {
                        where: {
                            id: id,
                        },
                    };
                    otherResultFilter = {
                        where: {
                            NOT: {
                                id: id,
                            },
                        },
                        take: 100,
                    };
                } else {
                    filter = {
                        where: {
                            id: id,
                            display: 1,
                        },
                    };
                    otherResultFilter = {
                        where: {
                            display: 1,
                            NOT: {
                                id: id,
                            },
                        },
                        take: 100,
                    };
                }

                const result = await prisma.works.findFirst(filter);

                const othersResult = await prisma.works.findMany(
                    otherResultFilter
                );

                const otherPosts = othersResult.map((work) => {
                    return {
                        img: work.nail_image_path,
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
                    return res.status(500).json({
                        error: "There nothing here.",
                    });
                }
            } catch (e) {
                return res.status(500).json({
                    error: `OMG ${e}`,
                });
            }
        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
