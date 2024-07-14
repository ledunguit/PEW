import React from "react";
import { App, Button, Typography } from "antd";

const { Title } = Typography;

const DashboardIndexPage = () => {
    const { message } = App.useApp();

    return (
        <div>
            <Title level={4}>User Dashboard</Title>
            <Button
                type="primary"
                onClick={() => message.success("Click from dashboard")}
            >
                Click me!
            </Button>
        </div>
    );
};

export default DashboardIndexPage;
