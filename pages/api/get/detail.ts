import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";


import Bold from '@tiptap/extension-bold'
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// Option 1: Browser + server-side
import { generateHTML } from '@tiptap/html'
import React, { useMemo } from 'react'
import console from "console";

export interface PostDetail {
    post: {
        title: string;
        description: string;
        image: string;
    }
    otherPosts: { img: string, id: string }
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            const id: number = parseInt(req.query.id as string)
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
                        id: work.id
                    }
                })

                if (result) {
                    res.status(200).json({
                        post: {
                            title: result.title,
                            description: result.desc,
                            image: result.image_path
                        },
                        others: otherPosts
                    });
                } else {
                    res.status(200).json({
                        error: "No such post",
                    });
                }
            } else {
                res.status(200).json({ error: "Invalid request para" });
            }
        default:
            res.status(405).end("Invalid request type");
            break;
    }
}
