import bcrypt from "bcrypt";
import { prisma } from "../../api/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            console.log("POST in");
            let username = req.body.username;
            let password = req.body.password;
            let fieldsExisting = username && password;
            console.log("CHECK FIELDS EXISTING");

            if (fieldsExisting) {
                console.log("FIELDS EXISTING");

                const result = await prisma.user.findFirst({
                    where: {
                        user_name: username,
                    },
                });

                // check result
                if (result) {
                    let isMatch = await bcrypt.compare(
                        password,
                        result.password
                    );
                    if (isMatch) {
                        res.status(200).json({
                            id: result.id,
                            name: result.user_name,
                            email: result.email,
                        });
                    } else {
                        res.status(200).json({
                            error: "password incorrect",
                        });
                    }
                } else {
                    res.status(200).json({
                        error: "No such user",
                    });
                }
            } else {
                res.status(200).json({ error: "Invalid request type" });
            }
            return;
        default:
            res.status(500).json({ error: "HTTP method incorrect" });
    }
}
