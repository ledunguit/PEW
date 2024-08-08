import React from "react";
import {App, Button, Card, Divider, Flex, Space, Tooltip, Typography} from "antd";
import {FiBookOpen} from "react-icons/fi";
import {SiPolywork, SiWheniwork} from "react-icons/si";
import {DashboardIndexPageData} from "@/types/pages/dashboard";
import {Link, usePage} from "@inertiajs/react";
import {ROUTES} from "@/route";
import {GrDocumentText} from "react-icons/gr";
import {SharedData} from "@/types";

const {Title} = Typography;

const projectActions: React.ReactNode[] = [
    <Space>
        <Tooltip title={"List all projects"}>
            <Link href={ROUTES.USER.PROJECTS.INDEX}>
                <Button type={'dashed'} icon={<FiBookOpen/>}>All projects</Button>
            </Link>
        </Tooltip>
    </Space>
]

const {Text} = Typography;

const DashboardIndexPage = ({data}: { data: DashboardIndexPageData }) => {
    const {message} = App.useApp();

    return (
        <Flex vertical gap={10}>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                User Dashboard
            </Divider>

            <Space align={'start'}>
                <Card actions={projectActions} bordered style={{minWidth: 300}}>
                    <Flex vertical gap={20}>
                        <Space>
                            <SiWheniwork/>
                            <Title level={5} className="text-center" style={{marginBottom: 0}}>Total projects</Title>
                        </Space>

                        <Space align="center">
                            <Title className={'text-center w-full'} level={4}>{data.projectCount ?? 0}</Title>
                        </Space>
                    </Flex>
                </Card>

                <Card actions={[]} bordered style={{minWidth: 300}}>
                    <Flex vertical gap={20}>
                        <Space>
                            <GrDocumentText/>
                            <Title level={5} className="text-center" style={{marginBottom: 0}}>Total documents</Title>
                        </Space>


                        <Space align="center">
                            <Title className={'text-center w-full'} level={4}>{data.documentCount ?? 0}</Title>
                        </Space>
                    </Flex>
                </Card>


                <Card actions={[]} bordered style={{minWidth: 300}}>
                    <Flex vertical gap={20}>
                        <Space>
                            <GrDocumentText/>
                            <Title level={5} className="text-center" style={{marginBottom: 0}}>Account active
                                from</Title>
                        </Space>


                        <Space align="center">
                            <Title className={'text-center w-full'}
                                   level={4}>{data.createdAt ? new Date(data.createdAt).toLocaleString() : "Not set"}</Title>
                        </Space>
                    </Flex>
                </Card>
            </Space>
        </Flex>
    );
};

export default DashboardIndexPage;
