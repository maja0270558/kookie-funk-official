import { ReactNode } from "react";
import Sidebar from "./Sidebar";
/// Redux import
import { useSelector } from "react-redux";
import { RootState } from "../store";
import classNames from "classnames";

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    const forest = "forest"
    const light = "lemonade"
    const dark = "dark"
    return (
        <div className="relative" data-theme={forest}>
            <Sidebar>
                {children}
            </Sidebar>
        </div>
    );
};
