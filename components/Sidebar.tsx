import React, { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

/// Next-auth
import { useSession } from "next-auth/react";
import { Rajdhani } from '@next/font/google'
const rajdhani = Rajdhani({ weight: "600", subsets: ['latin'] })

type Props = {
    children: ReactNode;
};

const Sidebar = ({ children }: Props) => {
    // login data
    const { data: session } = useSession();
    // get path router
    const router = useRouter();

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

    const menuItemClassName = `btn-block uppercase pl-2 text-left text-xl font-black mb-2 ${rajdhani.className}`
    const getLinkItemClasses = (isSelected: boolean, enable: boolean) => {
        return classNames(
            menuItemClassName,
            {
                ["text-white bg-primary"]: isSelected && enable,
                ["btn-ghost bg-base-100 hover:bg-base-200"]:
                    !isSelected && enable,
                ["text-gray-500"]: !enable,
            }
        );
    };
    const profileImage = "/profile.jpg";

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content flex flex-col relative">
                {/* nav bar on */}
                <div className="navbar bg-base-100 sticky top-0 z-50 lg:hidden ">
                    <label
                        htmlFor="my-drawer-2"
                        className="flex-none btn btn-primary btn-ghost drawer-button lg:hidden"
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
                        <a className="btn btn-ghost normal-case text-xl">
                            KOOKIE OFFICAL
                        </a>
                    </div>
                </div>

                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu w-80 pl-20 pt-20 pr-[100px] bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <div className="pb-16">
                        <Link href="./">
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
                                    <Link href={`${menu.link}`}>
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
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <Link href={"https://www.facebook.com/kookiefunk"}>
                        <div className="text-gray-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </div>
                    </Link>

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
                    {/* 
                    <a className="ml-3 text-gray-500">
                        <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                    </a> */}
                </span>
            </div>
        </footer>
    );
};

export default Sidebar;
