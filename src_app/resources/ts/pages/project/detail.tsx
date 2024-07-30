import React, { useState } from "react";
import {
    App,
    Button,
    Descriptions,
    Divider,
    Flex,
    Form,
    Space,
    Table,
    TableProps,
    Tooltip,
    Typography,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { Document, ProjectDetailPageData, SharedData } from "@/types";
import {
    FiAlertTriangle,
    FiDelete,
    FiDownload,
    FiUpload,
} from "react-icons/fi";
import { ROUTES } from "@/route";
import { router, usePage } from "@inertiajs/react";
import { FaFileSignature } from "react-icons/fa6";
import projectService from "@/services/modules/project";

const ProjectIndexPage = ({ data }: { data: ProjectDetailPageData }) => {
    const { message } = App.useApp();
    const props = usePage<SharedData>().props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const project = data.project;
    const documents = data.documents;
    const user = props.auth.user;

    const handleDeleteDocument = async (
        projectId: string,
        documentId: number
    ) => {
        try {
            await projectService.deleteDocument(projectId, documentId);

            message.success("Document deleted successfully");

            router.reload({
                only: ["data"],
            });
        } catch (error) {
            message.error("Something went wrong, please try again");
            console.log(error);
        }
    };

    const TableColumns: TableProps<Document>["columns"] = [
        {
            title: "Name",
            dataIndex: "document_name",
            key: "name",
        },
        {
            title: "Uploaded by",
            dataIndex: "uploaded_by",
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
            title: "Uploaded at",
            dataIndex: "created_at",
            key: "created_at",
            render: (_, record) => {
                return (
                    <Typography.Text copyable>
                        {new Date(record.created_at).toLocaleString()}
                    </Typography.Text>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 200,
            render: (_, record) => {
                return (
                    <Space>
                        <Tooltip title="Download this document">
                            <a
                                target="_blank"
                                href={ROUTES.USER.PROJECTS.DOWNLOAD_DOCUMENT(
                                    project.project_id,
                                    record.id
                                )}
                            >
                                <Button icon={<FiDownload />}></Button>
                            </a>
                        </Tooltip>
                        <Tooltip title="Verify this document">
                            <Button icon={<FaFileSignature />}></Button>
                        </Tooltip>
                        {user.id === record.created_by.id && (
                            <Tooltip title="Delete this document">
                                <Button
                                    danger
                                    icon={<FiDelete />}
                                    onClick={() =>
                                        handleDeleteDocument(
                                            project.project_id,
                                            record.id
                                        )
                                    }
                                ></Button>
                            </Tooltip>
                        )}
                    </Space>
                );
            },
        },
    ];

    const uploadFileProps: UploadProps = {
        name: "document_file",
        action: ROUTES.USER.PROJECTS.UPLOAD_DOCUMENT,
        headers: {
            "X-CSRF-TOKEN": props.csrf_token as string,
        },
        onChange: async (info) => {
            if (info.file.status === "done") {
                setFileList([]);
                router.reload({
                    only: ["data"],
                });
                await message.success(
                    `${info.file.name} file uploaded successfully for project ${project.project_id}`
                );
            } else if (info.file.status === "error") {
                setFileList([]);
                await message.error(`${info.file.response.data.message}`);
            }
        },
        data: {
            project_id: project.project_id,
        },
        fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
        },
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
        maxCount: 1,
    };

    const projectDetail = [
        {
            label: "Project ID",
            children: project.project_id,
        },
        {
            label: "Name",
            children: project.name,
        },
        {
            label: "Description",
            children: project.description,
        },
        {
            label: "Company",
            children: project.company_name,
        },
        {
            label: "Employees",
            children: project.number_of_employees,
        },
    ];

    return (
        <Flex vertical gap={10}>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                Project {project.project_id}
            </Divider>

            <Descriptions items={projectDetail} />
            {user.vault_setting ? (
                <Space>
                    <Form layout={"vertical"}>
                        <Form.Item name="document_file" valuePropName="upload">
                            <Upload {...uploadFileProps}>
                                <Button icon={<FiUpload />}>
                                    Click to upload new document
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Space>
            ) : (
                <Typography.Text>
                    <Space>
                        <FiAlertTriangle style={{ color: "red" }} />
                        You do not have any keypair to sign the document, please
                        contact the administrator.
                    </Space>
                </Typography.Text>
            )}

            <Table
                key={"key"}
                dataSource={documents.map((doc, index) => ({
                    ...doc,
                    key: index,
                }))}
                columns={TableColumns}
                scroll={{
                    x: 800,
                    y: 500,
                }}
            />
        </Flex>
    );
};

export default ProjectIndexPage;
