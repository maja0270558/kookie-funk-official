import React, { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

/// Next-auth
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useMantineColorScheme } from "@mantine/core";

type Props = {
    children: ReactNode;
};

const Sidebar = ({ children }: Props) => {
    // login data
    const { data: session } = useSession();
    // get path router
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { colorScheme } = useMantineColorScheme();

    interface MenuItem {
        label: string;
        link: string;
        enable: boolean;
    }

    const menuItems: MenuItem[] = [
        { label: "works", link: "/works", enable: true },
        { label: "store", link: "", enable: false },
        { label: "tutorials", link: "/tutorial", enable: true },
    ];

    if (session) {
        menuItems.push({
            label: "dashboard",
            link: "/dashboard",
            enable: true,
        });

        menuItems.push({
            label: "signout",
            link: "/api/auth/signout",
            enable: true,
        });
    }

    const menuItemClassName = `btn-block uppercase pl-2 text-left text-xl font-economica font-black mb-2`;
    const getLinkItemClasses = (isSelected: boolean, enable: boolean) => {
        return classNames(menuItemClassName, {
            ["text-white bg-primary"]: isSelected && enable,
            ["btn-ghost"]: !isSelected && enable,
            ["text-gray-500"]: !enable,
        });
    };
    const profileImage = "/profile.png";
    const mobileMenu = (
        <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 lg:hidden min-w-[100vh]">
            <label
                htmlFor="my-drawer-2"
                className="flex-none btn btn-primary btn-ghost drawer-button lg:hidden"
                onClick={() => {
                    setDrawerOpen(true);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-5 h-5 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </label>

            <div className="flex-1">
                <Link href="../" className="btn btn-ghost normal-case text-xl">
                    KOOKIE OFFICAL
                </Link>
            </div>
        </div>
    );

    return (
        <div className="drawer drawer-mobile">
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
                checked={drawerOpen}
            />
            <div className="drawer-content flex flex-col relative ">
                {/* nav bar on */}
                {mobileMenu}
                {children}
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    className="drawer-overlay"
                    onClick={() => {
                        setDrawerOpen(false);
                    }}
                ></label>
                <ul
                    className={`bg-100% ${
                        colorScheme == "light"
                            ? "bg-sidebar-texture-light"
                            : "bg-sidebar-texture-dark"
                    }  menu w-72 pl-20 pt-20 pr-[100px] bg-base-100 text-base-content`}
                >
                    {/* <!-- Sidebar content here --> */}
                    <div className="pb-16">
                        <Link href="../">
                            <Image
                                alt=""
                                src={profileImage}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="object-contain w-[200px] h-auto aspect-auto"
                                priority={true}
                            />
                        </Link>
                    </div>

                    <div className="flex-grow">
                        {menuItems.map(({ ...menu }) => {
                            const isSelected = router.pathname == menu.link;
                            return (
                                <div key={menu.label}>
                                    <Link
                                        onClick={() => {
                                            setDrawerOpen(false);
                                        }}
                                        as={`${menu.link}`}
                                        href={`${menu.link}`}
                                    >
                                        <button
                                            className={getLinkItemClasses(
                                                isSelected,
                                                menu.enable
                                            )}
                                        >
                                            {menu.label}
                                        </button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <Footer />
                </ul>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container  py-8 mx-auto  items-center sm:flex-row flex-col">
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-2">
                    <Link href={"https://www.instagram.com/kookiefunk/"}>
                        <div className="ml-3 text-gray-500">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    width="20"
                                    height="20"
                                    x="2"
                                    y="2"
                                    rx="5"
                                    ry="5"
                                ></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </div>
                    </Link>

                    <Link href={"https://twitter.com/kookiefunk"}>
                        <div className="text-gray-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>{" "}
                            </svg>
                        </div>
                    </Link>

                    <Link href={"https://www.youtube.com/@kookiefunk"}>
                        <div className="text-gray-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>{" "}
                            </svg>
                        </div>
                    </Link>
                </span>
            </div>
        </footer>
    );
};

export default Sidebar;
