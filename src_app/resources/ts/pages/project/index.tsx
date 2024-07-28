import React from "react";
import { Button, Divider, Flex, Space, Table, TableProps } from "antd";
import { Project, ProjectPageData } from "@/types";
import { FiBookOpen } from "react-icons/fi";
import { router } from "@inertiajs/react";
import { ROUTES } from "@/route";

const ProjectIndexPage = ({ data }: { data: ProjectPageData }) => {
    const TableColumns: TableProps["columns"] = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "project_id",
            title: "Project ID",
            dataIndex: "project_id",
        },
        {
            key: "documents_count",
            title: "Documents Count",
            dataIndex: "documents_count",
        },
        {
            title: "Members",
            dataIndex: "users_count",
            key: "users_count",
        },
        {
            key: "description",
            title: "Description",
            dataIndex: "description",
        },
        {
            key: "company_name",
            title: "Company",
            dataIndex: "company_name",
        },
        {
            key: "number_of_employees",
            title: "Employees",
            dataIndex: "number_of_employees",
        },
        {
            key: "start_date",
            title: "Start Date",
            dataIndex: "start_date",
        },
        {
            key: "end_date",
            title: "End Date",
            dataIndex: "end_date",
        },
        {
            key: "action",
            title: "Action",
            fixed: "right",
            dataIndex: "action",
            render: (_: any, record: Project) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<FiBookOpen />}
                        onClick={() => {
                            router.visit(
                                ROUTES.USER.PROJECTS.DETAIL(record.project_id)
                            );
                        }}
                    >
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Flex vertical>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                My Projects
            </Divider>

            <Table
                rowKey={"project_id"}
                locale={{ emptyText: "No projects found" }}
                columns={TableColumns}
                dataSource={data.projects}
                scroll={{
                    x: "max-content",
                }}
            />
        </Flex>
    );
};

export default ProjectIndexPage;
