import { Head } from "@inertiajs/react";
import { Flex } from "antd";
import React from "react";

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Head>
                <title>LeDungOQS - Internal file sharing | Login</title>
            </Head>
            <Flex align="center" justify="center" className="w-full h-screen">
                {children}
            </Flex>
        </>
    );
};

export default ErrorLayout;
