import React, { useState } from "react";
import {
    App,
    Button,
    Divider,
    Flex,
    Form,
    GetProp,
    Input,
    Select,
    Space,
    Typography,
    Upload,
    UploadFile,
    UploadProps,
    Watermark,
} from "antd";
import { FiInfo, FiRefreshCcw } from "react-icons/fi";
import { UploadOutlined } from "@ant-design/icons";
import { TbChecks, TbPencilCheck } from "react-icons/tb";
import { GrStatusWarning } from "react-icons/gr";
import { VerifyDocumentPageData } from "@/types";
import verifyDocumentService from "@/services/modules/verify-document";

const { Text } = Typography;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const VerifyDocumentPage = ({ data }: { data: VerifyDocumentPageData }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    const { message } = App.useApp();
    const [form] = Form.useForm();

    const handleUpload = async () => {
        if (
            !form.getFieldValue("signer_id") ||
            !form.getFieldValue("signature") ||
            fileList.length === 0
        ) {
            message.error("Please fill in all required fields");
            return;
        }

        const formData = new FormData();

        fileList.forEach((file) => {
            formData.append("files[]", file as FileType);
        });

        formData.append("signer_id", form.getFieldValue("signer_id"));
        formData.append("signature", form.getFieldValue("signature"));

        setVerifying(true);

        try {
            const res = await verifyDocumentService.verifyDocument(formData);

            setVerified(true);
            message.success(res.data?.message);
            form.resetFields();
            setFileList([]);
        } catch (error: any) {
            if (error?.data?.message) {
                message.error(error.data.message);
            } else {
                message.error("Something went wrong, please try again");
            }

            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    const uploadDocumentProps: UploadProps = {
        onChange: async (info) => {
            console.log(info);
            setFileList([info.file]);
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
        maxCount: 1,
    };

    return (
        <Flex vertical>
            <Divider
                className="select-none !m-0 !mb-4"
                type="horizontal"
                orientation="left"
                orientationMargin={0}
            >
                Verify Document
            </Divider>

            <Flex vertical gap={5}>
                <Space>
                    <FiInfo />
                    <Text>
                        To verify document, please upload document and signature
                        that has been signed by the signer.
                    </Text>
                </Space>

                <Form
                    name="verifyDocument"
                    layout="vertical"
                    form={form}
                    initialValues={{
                        signature:
                            "MIGIAkIBZKFUxIXt0LCw0qgOJnlpiP0gkBJIqZo1fUbIek0e7JFt8L59HY5e89m68mnBzJQBV0+txt1Cspb9U95Bh+fvatsCQgGr7S8zorJeMG06g44jtttXQ8vtGerY8vzP4+7KP/N9YdvPU/BhchS0ajW7UlwI2s6aHzoI0DL4aTRrtb3J5jboug==",
                    }}
                    onFinish={handleUpload}
                >
                    <Form.Item
                        name="documentToVerify"
                        label="Document you want to verify:"
                        required
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select file you want to verify",
                            },
                        ]}
                    >
                        <Upload {...uploadDocumentProps}>
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="signature"
                        label="Signature the signer give you:"
                        required
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input signature that signer give you",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            name="signature"
                            placeholder="Input file's signature"
                        ></Input.TextArea>
                    </Form.Item>

                    <Form.Item
                        name="signer_id"
                        label="Signer:"
                        required
                        rules={[
                            {
                                required: true,
                                message: "Please select signer",
                            },
                        ]}
                    >
                        <Select
                            options={data?.signers?.map((signer) => {
                                return {
                                    value: signer.id,
                                    label: signer.name,
                                };
                            })}
                            placeholder="Select signer"
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>

                    <Flex vertical gap={10}>
                        <Watermark
                            content={[
                                "Copyright © 2024 Lê Đăng Dũng",
                                "Inspired by and supported by Ph.D Nguyễn Ngọc Tự",
                                "Cryptography project",
                            ]}
                        >
                            <Text>Status:</Text>
                            <Space className="min-h-[200px]">
                                {verified ? (
                                    <Text type="success">
                                        <Space>
                                            <TbChecks />
                                            Verified
                                        </Space>
                                    </Text>
                                ) : (
                                    <Text type="danger">
                                        <Space>
                                            <GrStatusWarning />
                                            Not verified
                                        </Space>
                                    </Text>
                                )}
                            </Space>
                        </Watermark>

                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={verifying}
                                icon={<TbPencilCheck />}
                            >
                                Verify now
                            </Button>
                            <Button
                                danger
                                icon={<FiRefreshCcw />}
                                onClick={() => {
                                    form.resetFields();
                                    setFileList([]);
                                }}
                            >
                                Reset fields
                            </Button>
                        </Space>
                    </Flex>
                </Form>
            </Flex>
        </Flex>
    );
};

export default VerifyDocumentPage;
