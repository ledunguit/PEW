import "../../css/app.css";
import React, { useEffect, useState } from "react";
import { SiAsciidoctor } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { SlDocs } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { MdInfoOutline } from "react-icons/md";

import { Layout, Menu, Flex, Typography, App, MenuProps } from "antd";
import { Head } from "@inertiajs/react";
import { ROUTES } from "@/route";
import { usePage } from "@inertiajs/react";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems: MenuProps["items"] = [
    {
        key: "",
        icon: <RxDashboard />,
        label: "Bảng điều khiển",
        onClick: () => {
            window.location.href = ROUTES.DASHBOARD;
        },
    },
    {
        key: "/documents",
        icon: <SlDocs />,
        label: "Tài liệu",
        onClick: () => {
            window.location.href = ROUTES.DOCUMENTS;
        },
    },
    {
        key: "/account",
        icon: <FiUser />,
        label: "Tài khoản",
    },
    {
        key: "/info",
        icon: <MdInfoOutline />,
        label: "Thông tin",
    },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { route } = usePage().props;

    return (
        <App
            message={{
                maxCount: 1,
            }}
        >
            <Head>
                <title>LeDungOQS - Internal file sharing</title>
            </Head>
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        padding: "0 20px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Flex justify="center" align="center" gap={10}>
                        <SiAsciidoctor style={{ fontSize: 30 }} />
                        <Title level={5} style={{ margin: 0 }}>
                            LeDung OQS - Internal file sharing
                        </Title>
                    </Flex>
                </Header>

                <Layout>
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
                            items={menuItems}
                            selectedKeys={[route as string]}
                        />
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                                background: "white",
                                borderRadius: "8px",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>{children}</div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </App>
    );
};

export default MainLayout;
