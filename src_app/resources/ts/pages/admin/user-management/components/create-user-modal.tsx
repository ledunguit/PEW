import React from "react";
import { CreateUserForm } from "@/types";
import { App, Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { router } from "@inertiajs/react";
import { FiPlusCircle } from "react-icons/fi";
import { userManagementService } from "@/services/modules/admin/user-management";

const CreateUserModal = ({
    form,
    open,
    loading,
    setOpen,
}: {
    form: FormInstance<CreateUserForm>;
    open: boolean;
    loading: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { message } = App.useApp();

    const handleCreateUser = async (values: CreateUserForm) => {
        try {
            await userManagementService.createUser(values);
            message.success("User created successfully");
            setOpen(false);
            router.reload();
        } catch (error: any) {
            if (error.message) {
                message.error(error.message);
            } else {
                message.error("Something went wrong, please try again");
            }

            console.log(error);
        }
    };

    return (
        <Modal
            title="Create New User"
            open={open}
            loading={loading}
            okText={"Create"}
            okButtonProps={{
                icon: <FiPlusCircle />,
            }}
            onCancel={() => {
                setOpen(false);
                form.resetFields();
            }}
            onOk={() => form.submit()}
        >
            <Form
                form={form}
                layout="vertical"
                name="createUser"
                onFinish={handleCreateUser}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Name:"
                    rules={[
                        {
                            required: true,
                            message: "Please input name!",
                        },
                    ]}
                >
                    <Input placeholder="Name" required></Input>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email:"
                    rules={[
                        {
                            required: true,
                            message: "Please input email!",
                        },
                    ]}
                >
                    <Input placeholder="example@example.com" required></Input>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password:"
                    rules={[
                        {
                            required: true,
                            message: "Please input password!",
                        },
                    ]}
                >
                    <Input.Password required></Input.Password>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserModal;
