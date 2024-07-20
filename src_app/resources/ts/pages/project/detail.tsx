import React, {useState} from "react";
import {App, Button, Descriptions, Divider, Flex, Form, Space, Upload, UploadFile, UploadProps} from "antd";
import {Project} from "@/types";
import {FiUpload} from "react-icons/fi";
import {ROUTES} from "@/route";
import {usePage} from "@inertiajs/react";


const ProjectIndexPage = ({project}: { project: Project }) => {
    const {message} = App.useApp()
    const props = usePage().props
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const uploadFileProps: UploadProps = {
        name: 'document_file',
        action: ROUTES.USER.PROJECTS.UPLOAD_DOCUMENT,
        headers: {
            'X-CSRF-TOKEN': props.csrf_token as string
        },
        onChange: async (info) => {
            if (info.file.status === 'done') {
                setFileList([]);
                await message.success(`${info.file.name} file uploaded successfully for project ${project.project_id}`);
            } else if (info.file.status === 'error') {
                setFileList([]);
                await message.error(`${info.file.response.data.message}`);
            }
        },
        data: {
            project_id: project.project_id
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
        maxCount: 1
    }

    console.log(project)

    const projectDetail = [
        {
            label: "Project ID",
            children: project.project_id
        },
        {
            label: "Name",
            children: project.name
        },
        {
            label: "Description",
            children: project.description
        },
        {
            label: "Company",
            children: project.company_name
        },
        {
            label: "Employees",
            children: project.number_of_employees
        },
        {
            label: "Start Date",
            children: project.start_date
        },
        {
            label: "End Date",
            children: project.end_date
        },
    ]

    return (
        <Flex vertical>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                Project {project.project_id}
            </Divider>

            <Descriptions items={projectDetail}/>
            <Space>
                <Form layout={'vertical'}>
                    <Form.Item label="Upload new document" name="document_file" valuePropName="upload">
                        <Upload {...uploadFileProps}>
                            <Button icon={<FiUpload/>}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Space>
        </Flex>
    );
};

export default ProjectIndexPage;
