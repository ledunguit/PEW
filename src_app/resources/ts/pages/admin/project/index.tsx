import React, {useState} from "react";
import {
    Flex,
    Divider,
    TableProps,
    Table,
    Space,
    Button,
    Form,
    App,
} from "antd";
import AdminLayout from "@/layouts/admin";
import {AssignUserForm, CreateProjectForm, Project} from "@/types";
import {LuDelete, LuPlus, LuUser2} from "react-icons/lu";
import {PiFileCsv} from "react-icons/pi";
import CreateProjectModal from "./components/create-project-modal";
import {projectService} from "@/services/modules/admin/project";
import {router} from "@inertiajs/react";
import {FiBookOpen} from "react-icons/fi";
import AssigningUserModal from "./components/assign-user-modal";
import {ROUTES} from "@/route";

const ProjectIndexPage = ({projects}: { projects: Project[] }) => {
    const [createProjectForm] = Form.useForm<CreateProjectForm>();
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
        useState(false);

    const [assignUserForm] = Form.useForm<AssignUserForm>();
    const [assigningProject, setAssigningProject] = useState<Project | null>(
        null
    );
    const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const {message} = App.useApp();

    const handleDeleteProject = async (id: number) => {
        try {
            await projectService.delete(id);

            message.success(`Project ${id} deleted successfully`);

            router.reload();
        } catch (error) {
            message.error("Something went wrong, please try again");
            console.log(error);
        }
    };

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
            title: "Users Assigned",
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
                        type="dashed"
                        onClick={() => {
                            setAssigningProject(record);
                            setIsAssignUserModalOpen(true);
                        }}
                        icon={<LuUser2/>}
                    >
                        Assign Users
                    </Button>
                    <Button
                        type="dashed"
                        onClick={() => router.get(ROUTES.ADMIN.DOCUMENTS.SHOW_DOCUMENTS(record.project_id))}
                        icon={<FiBookOpen/>}
                    >
                        Documents
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteProject(record.id)}
                    >
                        <LuDelete/>
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Flex vertical>
                <Divider
                    className="select-none !m-0 !mb-4"
                    type="horizontal"
                    orientation="left"
                    orientationMargin={0}
                >
                    Projects Management
                </Divider>

                <Space className="mb-2">
                    <Button
                        type="primary"
                        icon={<LuPlus/>}
                        onClick={() => setIsCreateProjectModalOpen(true)}
                    >
                        Create
                    </Button>

                    <Button icon={<PiFileCsv/>}>Export CSV</Button>
                </Space>

                <Table
                    rowKey={"project_id"}
                    locale={{emptyText: "No projects found"}}
                    columns={TableColumns}
                    dataSource={projects}
                    scroll={{
                        x: "max-content",
                    }}
                />
            </Flex>

            <CreateProjectModal
                open={isCreateProjectModalOpen}
                setOpen={setIsCreateProjectModalOpen}
                loading={isLoading}
                form={createProjectForm}
            />

            <AssigningUserModal
                open={isAssignUserModalOpen}
                setOpen={setIsAssignUserModalOpen}
                loading={isLoading}
                form={assignUserForm}
                assigningProject={assigningProject}
            />
        </>
    );
};

ProjectIndexPage.layout = (page: React.ReactNode) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ProjectIndexPage;
