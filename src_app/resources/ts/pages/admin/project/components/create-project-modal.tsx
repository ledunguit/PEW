import React from "react";
import {
    App,
    DatePicker,
    Flex,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Modal,
    Space,
} from "antd";
import { CiSaveUp1 } from "react-icons/ci";
import { CreateProjectForm } from "@/types";
import { LuBuilding, LuUser2 } from "react-icons/lu";
import { projectService } from "@/services/modules/admin/project";
import { router } from "@inertiajs/react";

const CreateProjectModal = ({
    form,
    open,
    loading,
    setOpen,
}: {
    form: FormInstance<CreateProjectForm>;
    open: boolean;
    loading: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { message } = App.useApp();

    const handleCreateProject = async (values: CreateProjectForm) => {
        try {
            await projectService.create(values);

            message.success("Project created successfully");
            router.reload();
        } catch (error) {
            message.error("Something went wrong, please try again");
            console.log(error);
        }

        setOpen(false);
        form.resetFields();
    };

    return (
        <Modal
            title="Create Project"
            open={open}
            loading={loading}
            okText={
                <Space>
                    <CiSaveUp1 />
                    Create
                </Space>
            }
            onOk={() => form.submit()}
            onCancel={() => {
                setOpen(false);
                form.resetFields();
            }}
        >
            <Form
                form={form}
                name="createProjectForm"
                layout="vertical"
                onFinish={handleCreateProject}
            >
                <Form.Item
                    name="name"
                    label="Name:"
                    rules={[
                        {
                            required: true,
                            message: "Please input project name!",
                        },
                    ]}
                >
                    <Input placeholder="Project Name" required></Input>
                </Form.Item>

                <Form.Item name="description" label="Description:">
                    <Input.TextArea
                        maxLength={1000}
                        placeholder="Project Description"
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    ></Input.TextArea>
                </Form.Item>

                <Form.Item
                    name="company_name"
                    label="Company Name:"
                    rules={[
                        {
                            required: true,
                            message: "Please input company name!",
                        },
                    ]}
                >
                    <Input
                        addonBefore={<LuBuilding />}
                        placeholder="Company Name"
                    ></Input>
                </Form.Item>

                <Form.Item
                    name="number_of_employees"
                    label="Employees:"
                    rules={[
                        {
                            required: true,
                            message: "Please input number of employees!",
                        },
                    ]}
                >
                    <InputNumber
                        className="w-full"
                        addonBefore={<LuUser2 />}
                        type="number"
                        placeholder="Number of employees"
                    ></InputNumber>
                </Form.Item>

                <Flex justify="space-between">
                    <Form.Item
                        name="start_date"
                        label="Start Date:"
                        rules={[
                            {
                                required: true,
                                message: "Please input start date!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const endDate = getFieldValue("end_date");

                                    if (value > endDate) {
                                        return Promise.reject(
                                            new Error(
                                                "Start Date must be before End Date!"
                                            )
                                        );
                                    }

                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <DatePicker placeholder="Start Date"></DatePicker>
                    </Form.Item>

                    <Form.Item
                        name="end_date"
                        label="End Date:"
                        rules={[
                            {
                                required: true,
                                message: "Please input end date!",
                            },
                        ]}
                    >
                        <DatePicker placeholder="End Date"></DatePicker>
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    );
};

export default CreateProjectModal;
