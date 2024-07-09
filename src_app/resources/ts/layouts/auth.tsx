import { Head } from "@inertiajs/react";
import { App, Flex } from "antd";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <App
            message={{
                maxCount: 1,
            }}
        >
            <Head>
                <title>LeDungOQS - Internal file sharing | Login</title>
            </Head>
            <Flex align="center" justify="center" className="w-full h-screen">
                {children}
            </Flex>
        </App>
    );
};

export default AuthLayout;
