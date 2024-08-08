import React, {ReactNode} from "react";
import {Typography, Flex, Divider, Space, Card, Tooltip, Button} from "antd";
import AdminLayout from "@/layouts/admin";
import {SiWheniwork} from "react-icons/si";
import {GrDocumentText} from "react-icons/gr";
import {Link} from "@inertiajs/react";
import {ROUTES} from "@/route";
import {FiBookOpen} from "react-icons/fi";
import {AdminDashboardIndexPageData} from "@/types/pages/admin/dashboard";
import {IoDocumentsOutline} from "react-icons/io5";

const adminProjectActions: ReactNode[] = [
    <Space>
        <Tooltip title={"List all projects"}>
            <Link href={ROUTES.ADMIN.PROJECTS.INDEX}>
                <Button type={'dashed'} icon={<FiBookOpen/>}>All projects</Button>
            </Link>
        </Tooltip>
    </Space>
]

const adminDocumentActions: ReactNode[] = [
    <Space>
        <Tooltip title={"List all documents"}>
            <Link href={ROUTES.ADMIN.DOCUMENTS.INDEX}>
                <Button type={'dashed'} icon={<IoDocumentsOutline/>}>All documents</Button>
            </Link>
        </Tooltip>
    </Space>
]

const adminUserActions: ReactNode[] = [
    <Space>
        <Tooltip title={"List all users"}>
            <Link href={ROUTES.ADMIN.USERS.INDEX}>
                <Button type={'dashed'} icon={<IoDocumentsOutline/>}>All users</Button>
            </Link>
        </Tooltip>
    </Space>
]

const {Title, Text} = Typography;

const DashboardIndexPage = ({data}: { data: AdminDashboardIndexPageData }) => {
    return (
        <Flex vertical gap={10}>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                Admin Dashboard
            </Divider>

            <Space align={'start'}>
                <Card actions={adminProjectActions} bordered style={{minWidth: 300}}>
                    <Flex vertical gap={20}>
                        <Space>
                            <SiWheniwork/>
                            <Title level={5} className="text-center" style={{marginBottom: 0}}>Total projects</Title>
                        </Space>

                        <Space align="center">
                            <Title className={'text-center w-full'} level={4}>{data?.projectsCount ?? 0}</Title>
                        </Space>
                    </Flex>
                </Card>

                <Card actions={adminDocumentActions} bordered style={{minWidth: 300}}>
                    <Flex vertical gap={20}>
                        <Space>
                            <GrDocumentText/>
                            <Title level={5} className="text-center" style={{marginBottom: 0}}>Total documents</Title>
                        </Space>


                        <Space align="center">
                            <Title className={'text-center w-full'} level={4}>{data?.documentsCount ?? 0}</Title>
                        </Space>
                    </Flex>
                </Card>


                <Card actions={adminUserActions} bordered style={{minWidth: 300}}>
                    <Flex vertical gap={20}>
                        <Space>
                            <GrDocumentText/>
                            <Title level={5} className="text-center" style={{marginBottom: 0}}>Total users</Title>
                        </Space>


                        <Space align="center">
                            <Title className={'text-center w-full'}
                                   level={4}>{data?.usersCount - 1 ?? 0}</Title>
                        </Space>
                    </Flex>
                </Card>
            </Space>
        </Flex>
    );
};

DashboardIndexPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default DashboardIndexPage;
