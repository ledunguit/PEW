import React from "react";
import { ROUTES } from "@/route";
import { MenuProps } from "antd";
import { FiSettings, FiUser } from "react-icons/fi";
import { LuFolderHeart, LuUsers2 } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdInfoOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export const ADMIN_MENU_ITEMS: MenuProps["items"] = [
    {
        key: "admin/dashboard",
        icon: <RxDashboard />,
        label: "Dashboard",
        onClick: () => {
            window.location.href = ROUTES.ADMIN.DASHBOARD;
        },
    },
    {
        key: "admin/projects",
        icon: <LuFolderHeart />,
        label: "Projects",
        onClick: () => {
            window.location.href = ROUTES.ADMIN.PROJECTS;
        },
    },
    {
        key: "admin/users",
        icon: <LuUsers2 />,
        label: "Users",
        onClick: () => {
            window.location.href = ROUTES.ADMIN.USERS.INDEX;
        },
    },
    {
        key: "admin/profile",
        icon: <CgProfile />,
        label: "Profile",
        onClick: () => {
            window.location.href = ROUTES.ADMIN.PROFILE;
        },
    },
    {
        key: "admin/settings",
        icon: <FiSettings />,
        label: "Settings",
        onClick: () => {
            window.location.href = ROUTES.ADMIN.SETTINGS.INDEX;
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
