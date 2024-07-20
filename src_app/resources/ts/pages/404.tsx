import React from "react";
import {Button, Result, Typography} from "antd";
import ErrorLayout from "@/layouts/error";
import {router} from "@inertiajs/react";
import {ROUTES} from "@/route";

const {Title} = Typography;

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => router.visit(ROUTES.HOME)}>Back Home</Button>}
        />
    );
};

NotFoundPage.layout = (page: React.ReactNode) => {
    return <ErrorLayout>{page}</ErrorLayout>;
};

export default NotFoundPage;
