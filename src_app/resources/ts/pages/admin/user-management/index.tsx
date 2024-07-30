import React, { useState } from "react";
import {
    Typography,
    Flex,
    Divider,
    Table,
    TableProps,
    Button,
    Tooltip,
    Space,
    Badge,
    App,
    Modal,
    Form,
    Popconfirm,
    Switch,
} from "antd";
import AdminLayout from "@/layouts/admin";
import { CreateUserForm, User, UserManagementPageData } from "@/types";
import { FiBookOpen, FiDelete, FiEdit, FiKey, FiPlus } from "react-icons/fi";
import { userManagementService } from "@/services/modules/admin/user-management";
import { router } from "@inertiajs/react";
import CreateUserModal from "./components/create-user-modal";
import { QuestionCircleOutlined } from "@ant-design/icons";

const UserManagementPage = ({ data }: { data: UserManagementPageData }) => {
    const { message } = App.useApp();

    const [createUserForm] = Form.useForm<CreateUserForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);

    const handleGenerateKeyPair = async (record: User) => {
        try {
            await userManagementService.generateKeyPair(record.id);

            message.success("Key pair generated successfully");

            setIsOpenCreateUserModal(false);

            router.reload({
                only: ["data"],
            });
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message);
            }
            console.log(error);
        }
    };

    const handleDeleteUser = async (record: User) => {
        try {
            await userManagementService.deleteUser(record.id);
            message.success("User deleted successfully");
            router.reload({
                only: ["data"],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusChange = async (record: User, value: boolean) => {
        try {
            await userManagementService.updateUserStatus(record.id, value);
            message.success("User status updated successfully");
            router.reload({
                only: ["data"],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const TableColumns: TableProps<User>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (_, record) => {
                return (
                    <Typography.Text copyable>{record.email}</Typography.Text>
                );
            },
        },
        {
            title: "Have Keypair",
            dataIndex: "isSetKeyPair",
            key: "isSetKeyPair",
            render: (_, record) => {
                return (
                    <Badge
                        color={record.vault_setting ? "green" : "red"}
                        text={record.vault_setting ? "Yes" : "No"}
                    />
                );
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                return (
                    <Switch
                        checked={record.status}
                        onChange={(value) => handleStatusChange(record, value)}
                    />
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
                        <Tooltip title="Delete">
                            <Popconfirm
                                title="Are you sure?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDeleteUser(record)}
                                icon={
                                    <QuestionCircleOutlined
                                        style={{ color: "red" }}
                                    />
                                }
                            >
                                <Button danger>
                                    <FiDelete />
                                </Button>
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button
                                onClick={() => {
                                    message.info("Not supported yet");
                                }}
                            >
                                <FiEdit />
                            </Button>
                        </Tooltip>

                        <Tooltip title="View">
                            <Button
                                onClick={() => {
                                    message.info("Not supported yet");
                                }}
                            >
                                <FiBookOpen />
                            </Button>
                        </Tooltip>

                        {!record.vault_setting && (
                            <Tooltip title="Generate keypair">
                                <Button
                                    onClick={() =>
                                        handleGenerateKeyPair(record)
                                    }
                                >
                                    <FiKey />
                                </Button>
                            </Tooltip>
                        )}
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
                Users Management
            </Divider>

            <Space className="mb-2">
                <Button
                    type="primary"
                    icon={<FiPlus />}
                    onClick={() => setIsOpenCreateUserModal(true)}
                >
                    New
                </Button>
            </Space>

            <Table
                rowKey={"id"}
                locale={{ emptyText: "No users found" }}
                columns={TableColumns}
                dataSource={data.users ?? []}
                scroll={{
                    x: "max-content",
                }}
            />

            <CreateUserModal
                form={createUserForm}
                open={isOpenCreateUserModal}
                loading={isLoading}
                setOpen={setIsOpenCreateUserModal}
            />
        </Flex>
    );
};

UserManagementPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UserManagementPage;
