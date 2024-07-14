import React from "react";
import { Typography, Flex } from "antd";
import AdminLayout from "@/layouts/admin";

const { Title, Text } = Typography;

const SettingIndexPage = () => {
    return (
        <Flex>
            <Title level={4}>Admin Settings</Title>
        </Flex>
    );
};

SettingIndexPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default SettingIndexPage;
