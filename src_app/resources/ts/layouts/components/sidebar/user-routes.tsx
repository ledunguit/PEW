import { ROUTES } from "@/route";
import { MenuProps } from "antd";
import React from "react";
import { FiSettings, FiUser } from "react-icons/fi";
import { LuFolderHeart } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { SlDocs } from "react-icons/sl";
import { MdInfoOutline } from "react-icons/md";

export const USER_MENU_ITEMS: MenuProps["items"] = [
    {
        key: "dashboard",
        icon: <RxDashboard />,
        label: "Dashboard",
        onClick: () => {
            window.location.href = ROUTES.USER.DASHBOARD;
        },
    },
    {
        key: "projects",
        icon: <LuFolderHeart />,
        label: "Projects",
        onClick: () => {
            window.location.href = ROUTES.USER.PROJECTS;
        },
    },
    {
        key: "documents",
        icon: <SlDocs />,
        label: "Documents",
        onClick: () => {
            window.location.href = ROUTES.USER.DOCUMENTS;
        },
    },
    {
        key: "profile",
        icon: <FiUser />,
        label: "Profile",
        onClick: () => {
            window.location.href = ROUTES.USER.PROFILE;
        },
    },
    {
        key: "settings",
        icon: <FiSettings />,
        label: "Settings",
        onClick: () => {
            window.location.href = ROUTES.USER.SETTINGS.INDEX;
        },
    },
    {
        key: "info",
        icon: <MdInfoOutline />,
        label: "Info",
        onClick: () => {
            window.location.href = ROUTES.INFO;
        },
    },
];
