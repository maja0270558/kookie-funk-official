export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/create_post", "/edit_post"] };
