import React from "react";
import { Typography, Flex } from "antd";
import AdminLayout from "@/layouts/admin";

const { Title, Text } = Typography;

const DashboardIndexPage = () => {
    return (
        <Flex>
            <Title level={4}>Admin Dashboard</Title>
        </Flex>
    );
};

DashboardIndexPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default DashboardIndexPage;
