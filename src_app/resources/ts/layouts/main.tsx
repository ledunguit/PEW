import "../../css/app.css";
import React, { useState } from "react";
import { Layout, App } from "antd";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Sidebar from "./components/sidebar";
import Headerbar from "./components/headerbar";
import { SharedData } from "@/types";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { route, auth } = usePage<SharedData>().props;
    const [collapsed, setCollapsed] = useState<boolean>(false);

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
                <Headerbar auth={auth} />

                <Layout>
                    <Sidebar
                        route={route as string}
                        auth={auth}
                        collapsed={collapsed as boolean}
                        setCollapsed={setCollapsed}
                    />

                    <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
