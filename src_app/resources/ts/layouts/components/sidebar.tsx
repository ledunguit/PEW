import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { RxDashboard } from "react-icons/rx";
import { SlDocs } from "react-icons/sl";
import { FiSettings, FiUser } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";
import { ROUTES } from "@/route";
import { LuFolderHeart } from "react-icons/lu";
import { AuthData } from "@/types";

const { Sider } = Layout;

const Sidebar = ({
    route,
    auth,
    collapsed,
    setCollapsed,
}: {
    route: string;
    auth: AuthData;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}) => {
    const menuItems: MenuProps["items"] = [
        {
            key: "/",
            icon: <RxDashboard />,
            label: "Dashboard",
            onClick: () => {
                window.location.href = ROUTES.DASHBOARD;
            },
        },
        {
            key: "/documents",
            icon: <SlDocs />,
            label: "Documents",
            onClick: () => {
                window.location.href =
                    auth.user.role === "admin"
                        ? ROUTES.ADMIN.DOCUMENTS
                        : ROUTES.USER.DOCUMENTS;
            },
        },
        {
            key: "/projects",
            icon: <LuFolderHeart />,
            label: "Projects",
            onClick: () => {
                window.location.href =
                    auth.user.role === "admin"
                        ? ROUTES.ADMIN.PROJECTS
                        : ROUTES.USER.PROJECTS;
            },
        },
        {
            key: "/account",
            icon: <FiUser />,
            label: "Account",
            onClick: () => {
                window.location.href =
                    auth.user.role === "admin"
                        ? ROUTES.ADMIN.ACCOUNT
                        : ROUTES.USER.ACCOUNT;
            },
        },
        {
            key: "/settings",
            icon: <FiSettings />,
            label: "Settings",
            onClick: () => {
                window.location.href =
                    auth.user.role === "admin"
                        ? ROUTES.ADMIN.SETTINGS.INDEX
                        : ROUTES.USER.SETTINGS.INDEX;
            },
        },
        {
            key: "/info",
            icon: <MdInfoOutline />,
            label: "Info",
            onClick: () => {
                window.location.href = ROUTES.INFO;
            },
        },
    ];

    return (
        <Sider
            onCollapse={() => setCollapsed(!collapsed)}
            collapsible
            collapsed={collapsed}
            theme="light"
            breakpoint="md"
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 64,
                bottom: 0,
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu mode="inline" items={menuItems} selectedKeys={[route]} />
        </Sider>
    );
};

export default Sidebar;
