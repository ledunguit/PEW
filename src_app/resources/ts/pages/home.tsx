import React from "react";
import { Typography, Flex, Space, Button } from "antd";
import LandingLayout from "@/layouts/landing";
import { router } from "@inertiajs/react";

const { Title, Text } = Typography;

const HomePage = () => {
    return (
        <Flex>
            <Space direction="vertical">
                <Title level={4}>LEDUNGOQS</Title>
                <Text>Version: 0.0.1</Text>
                <Text>Copyright: 2024</Text>
                <Text>Author: Le Dang Dung</Text>
                <Button onClick={() => router.visit("auth/login")}>
                    Enter application
                </Button>
            </Space>
        </Flex>
    );
};

HomePage.layout = (page: React.ReactNode) => {
    return <LandingLayout>{page}</LandingLayout>;
};

export default HomePage;
