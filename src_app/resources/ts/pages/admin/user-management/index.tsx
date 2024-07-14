import React from "react";
import { Typography, Flex } from "antd";
import AdminLayout from "@/layouts/admin";

const { Title, Text } = Typography;

const UserManagementPage = () => {
    return (
        <Flex>
            <Title level={4}>Manage Users</Title>
        </Flex>
    );
};

UserManagementPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UserManagementPage;
