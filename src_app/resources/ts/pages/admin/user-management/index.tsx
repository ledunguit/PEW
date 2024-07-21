import React from "react";
import {Typography, Flex, Divider, Table, TableProps, Button, Tooltip, Space, Badge, App} from "antd";
import AdminLayout from "@/layouts/admin";
import {User, UserManagementPageData} from "@/types";
import {FiBookOpen, FiDelete, FiEdit, FiKey} from "react-icons/fi";
import {userManagementService} from "@/services/modules/admin/user-management";
import {router} from "@inertiajs/react";

const UserManagementPage = ({data}: { data: UserManagementPageData }) => {
    console.log(data)
    const {message} = App.useApp();
    const handleGenerateKeyPair = async (record: User) => {
        try {
            await userManagementService.generateKeyPair(record.id)

            message.success("Key pair generated successfully")
            
            router.reload({
                only: ["data"],
            })
        } catch (error) {
            console.log(error)
        }
    }

    const TableColumns: TableProps["columns"] = [
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
                return <Typography.Text copyable>{record.email}</Typography.Text>
            }
        },
        {
            title: "Have Keypair",
            dataIndex: "isSetKeyPair",
            key: "isSetKeyPair",
            render: (_, record) => {
                return <Badge
                    color={record.vault_setting ? "green" : "red"}
                    text={record.vault_setting ? "Yes" : "No"}
                />
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => {
                return <Space>
                    <Tooltip title='Delete'><Button danger><FiDelete/></Button></Tooltip>
                    <Tooltip title='Edit'>
                        <Button type='primary'><FiEdit/></Button>
                    </Tooltip>

                    <Tooltip title='View'>
                        <Button>
                            <FiBookOpen/>
                        </Button>
                    </Tooltip>

                    {
                        !record.vault_setting &&
                        <Tooltip title="Generate keypair">
                            <Button onClick={() => handleGenerateKeyPair(record)}><FiKey/></Button>
                        </Tooltip>
                    }
                </Space>
            },
        }
    ]

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

            <Table
                rowKey={"id"}
                locale={{emptyText: "No users found"}}
                columns={TableColumns}
                dataSource={data.users ?? []}
                scroll={{
                    x: "max-content",
                }}
            />
        </Flex>
    );
};

UserManagementPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UserManagementPage;
