import React from "react";
import {
    Flex,
    Divider,
    Space,
    Button,
    Table,
    TableProps,
    Typography,
    App,
} from "antd";
import { PiFileCsv } from "react-icons/pi";
import { AdminDocument, DocumentIndexPageData } from "@/types";
import { FiBookOpen, FiDelete, FiDownload } from "react-icons/fi";
import { GoProjectSymlink } from "react-icons/go";
import * as _ from "lodash";
import { ROUTES } from "@/route";

const DocumentIndexPage = ({ data }: { data: DocumentIndexPageData }) => {
    const { message } = App.useApp();
    const projectIdFilters = _.uniqWith(
        data.documents.map((doc) => {
            return {
                text: doc.project.project_id,
                value: doc.project.project_id,
            };
        }),
        (a, b) => a.text === b.text
    );

    const TableColumns: TableProps<AdminDocument>["columns"] = [
        {
            title: "Name",
            dataIndex: "document_name",
            key: "name",
        },
        {
            title: "Signature",
            dataIndex: "signature",
            key: "signature",
            render: (_, record) => {
                return (
                    <Typography.Text copyable>
                        {record.signature}
                    </Typography.Text>
                );
            },
        },
        {
            title: "Project ID",
            dataIndex: "project_id",
            key: "project_id",
            render: (_, record) => {
                return (
                    <Typography.Text copyable>
                        {record.project.project_id}
                    </Typography.Text>
                );
            },
            filters: projectIdFilters,
            onFilter: (value, record) =>
                record.project.project_id.includes(value as string),
        },
        {
            title: "Uploaded by",
            dataIndex: "created_by",
            key: "uploaded_by",
            render: (_, record) => {
                return (
                    <Typography.Text copyable>
                        {record.created_by.name}
                    </Typography.Text>
                );
            },
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at",
            render: (_, record) => {
                return (
                    <Typography.Text copyable>
                        {record.created_at}
                    </Typography.Text>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => {
                return (
                    <Space>
                        <a
                            target="_blank"
                            href={`${ROUTES.ADMIN.DOCUMENTS.DOWNLOAD_DOCUMENT(
                                record.project.project_id,
                                record.id
                            )}`}
                        >
                            <Button type={"primary"} icon={<FiDownload />} />
                        </a>
                        <Button
                            type={"primary"}
                            icon={<FiBookOpen />}
                            onClick={() => {
                                message.warning(
                                    `Need implementation. Open document ${record.document_name}`
                                );
                            }}
                        />
                        <Button
                            icon={<GoProjectSymlink />}
                            onClick={() => {
                                message.warning(
                                    `Need implementation. Open project ${record.project.project_id}`
                                );
                            }}
                        />
                        <Button
                            danger
                            icon={<FiDelete />}
                            onClick={() => {
                                message.warning(
                                    `Need implementation. Delete document ${record.document_name}`
                                );
                            }}
                        />
                    </Space>
                );
            },
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
                Documents
            </Divider>

            <Space className="mb-2">
                <Button type={"primary"} icon={<PiFileCsv />}>
                    Export CSV
                </Button>
            </Space>

            <Table
                rowKey={"id"}
                columns={TableColumns}
                dataSource={data.documents}
                locale={{ emptyText: "No document found" }}
                scroll={{
                    y: 600,
                }}
            />
        </Flex>
    );
};

export default DocumentIndexPage;
