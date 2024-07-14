import React from "react";
import { Typography, Flex, Space } from "antd";
import AdminLayout from "@/layouts/admin";

const { Title, Text } = Typography;

const ProjectIndexPage = () => {
    return (
        <Flex>
            <Space direction="vertical">
                <Title level={4}>Info</Title>
                <Text>Version: 0.0.1</Text>
                <Text>Copyright: 2024</Text>
                <Text>Author: Le Dang Dung</Text>
            </Space>
        </Flex>
    );
};

export default ProjectIndexPage;
