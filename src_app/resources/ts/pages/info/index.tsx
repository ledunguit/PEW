import React from "react";
import {Typography, Flex, Space, Divider} from "antd";
import AdminLayout from "@/layouts/admin";

const {Title, Text} = Typography;

const ProjectIndexPage = () => {
    return (
        <Flex vertical gap={10}>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                App info
            </Divider>

            <Space direction="vertical">
                <Text>- Version: 0.0.1</Text>
                <Text>- Copyright: 2024</Text>
                <Text>- Lecturer: PhD Nguyễn Ngọc Tự</Text>
                <Text>- Student: Lê Đăng Dũng</Text>
            </Space>
        </Flex>
    );
};

export default ProjectIndexPage;
