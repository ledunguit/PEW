import React from "react";
import { Typography, Flex } from "antd";
import AdminLayout from "@/layouts/admin";

const { Title, Text } = Typography;

const ProfileIndexPage = () => {
    return (
        <Flex>
            <Title level={4}>Admin Profile</Title>
        </Flex>
    );
};

ProfileIndexPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ProfileIndexPage;
