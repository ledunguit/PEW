import React, { useState } from "react";
import { App, Form, FormInstance, Modal, Space } from "antd";
import { AssignUserForm, Project } from "@/types";
import { MdOutlineAddLink } from "react-icons/md";
import DebounceSelect from "@/layouts/components/controls/debounce-select";
import { userManagementService } from "@/services/modules/admin/user-management";
import { projectService } from "@/services/modules/admin/project";

interface UserValue {
    label: string;
    value: string;
}

async function fetchUserList(email: string): Promise<UserValue[]> {
    if (!email) return [];

    return userManagementService.getUsersLikeByName(email).then((res) => {
        return res.data?.users?.map((user: any) => {
            return {
                label: `${user.name} (${user.email})`,
                value: user.id,
            };
        });
    });
}

const AssigningUserModal = ({
    form,
    open,
    loading,
    setOpen,
    assigningProject,
}: {
    form: FormInstance<AssignUserForm>;
    open: boolean;
    loading: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    assigningProject: Project | null;
}) => {
    const { message } = App.useApp();
    const [users, setUsers] = useState<UserValue[]>([]);

    const handleAssignUsers = async () => {
        if (!assigningProject) {
            message.error("Something went wrong, please try again");
            return;
        }

        try {
            const projectId = assigningProject.project_id;
            const userIds = users.map((user) => user.value);

            await projectService.assignUsers(projectId, userIds);
        } catch (error: any) {
            if (error?.data?.message) {
                message.error(error.data.message);
            } else {
                message.error("Something went wrong, please try again");
            }
            console.log(error);
        }

        setOpen(false);
        form.resetFields();
    };

    if (!assigningProject) return <></>;

    return (
        <Modal
            title="Assign users to project"
            open={open}
            loading={loading}
            okText={
                <Space>
                    <MdOutlineAddLink />
                    Assign
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
                name="assignUserForm"
                layout="vertical"
                onFinish={handleAssignUsers}
            >
                <DebounceSelect
                    mode="multiple"
                    value={users}
                    placeholder="Select users"
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => {
                        setUsers(newValue as UserValue[]);
                    }}
                    style={{ width: "100%" }}
                />
            </Form>
        </Modal>
    );
};

export default AssigningUserModal;
