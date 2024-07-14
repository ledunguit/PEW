import React, { useState } from "react";
import { Typography, Flex, Space, Button } from "antd";
import LandingLayout from "@/layouts/landing";
import { router } from "@inertiajs/react";
import { IoRocketOutline } from "react-icons/io5";
import { MdOutlineRocket, MdOutlineRocketLaunch } from "react-icons/md";

const { Title, Text } = Typography;

const HomePage = () => {
    const [hover, setHover] = useState(false);

    return (
        <Flex>
            <Space direction="vertical" align="center">
                <Title level={4}>LEDUNGOQS - Internal File Sharing</Title>
                <Text>Version: 0.0.1</Text>
                <Text>Copyright: 2024</Text>
                <Text>Author: Le Dang Dung</Text>
                <Button
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => router.visit("auth/login")}
                    classNames={{
                        icon: "text-xl",
                    }}
                    icon={
                        hover ? <MdOutlineRocketLaunch /> : <MdOutlineRocket />
                    }
                >
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
