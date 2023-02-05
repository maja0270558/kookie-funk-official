import { prisma } from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary"

interface BodyArgument {
    image_data_url: string;
    nail_image_data_url: string;
    title: string;
    description: string;
    cat_id: number
}

function getRandomId() {
    return Date.now() + ((Math.random() * 100000).toFixed());
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            let body: BodyArgument = req.body;

            const fieldexist = body.image_data_url && body.nail_image_data_url && body.title && body.cat_id
            if (!fieldexist) {
                res.status(500);
                break;
            }

            let id = getRandomId();

            // Upload
            const imageCldRes = cloudinary.v2.uploader.upload(body.image_data_url, { public_id: `works/${id}` })
            const nailImageCldRes = cloudinary.v2.uploader.upload(body.nail_image_data_url, { public_id: `thumbnails/${id}` })

            Promise.all([imageCldRes, nailImageCldRes])
                .then(function (valArray) {
                    const imageUploadResult = valArray[0]
                    const nailImageUploadResult = valArray[1]
                    console.log(imageUploadResult)
                    console.log(nailImageUploadResult)
                    return ({
                        imageURL: imageUploadResult.url,
                        nailImageURL: nailImageUploadResult.url
                    })
                })
                .then(async (value) => {
                    const result = await prisma.works.create({
                        data: {
                            title: body.title,
                            image_path: value.imageURL,
                            nail_image_path: value.nailImageURL,
                            desc: body.description,
                            display: 1,
                            cat_id: body.cat_id,
                            // image_public_id: id
                        },
                    });

                })
                .catch((err) => {
                    console.log(err);
                });;

            // Generate 
            const url = cloudinary.v2.url(`works/${id}`, {
                width: 100,
                height: 150,
                Crop: 'fill'
            });
            console.log(url)
            res.json({
                url: url
            });
            return
        default:
            res.status(405);
            break;
    }
}
