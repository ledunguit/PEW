import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { AuthData } from "@/types";
import { ADMIN_MENU_ITEMS } from "./admin-routes";
import { USER_MENU_ITEMS } from "./user-routes";

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
    useEffect(() => {
        console.log(route);
    });
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
            <Menu
                mode="inline"
                items={
                    auth.user.role === "admin"
                        ? ADMIN_MENU_ITEMS
                        : USER_MENU_ITEMS
                }
                selectedKeys={[route]}
            />
        </Sider>
    );
};

export default Sidebar;
