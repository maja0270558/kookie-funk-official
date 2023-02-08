import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostEditPage from "../components/PostEditPage";
import { useAppSelector } from "../hook";

const edit_post = () => {
    // const target = useAppSelector((state) => state.edit.targetPost);
    return <PostEditPage />;
};

export default edit_post;
