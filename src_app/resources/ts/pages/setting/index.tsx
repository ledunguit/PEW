import { keypairService } from "@/services";
import {
    Keypair,
    KeyPairAuthenticationFormType,
    SettingPageData,
} from "@/types";
import { router } from "@inertiajs/react";
import {
    App,
    Button,
    Flex,
    Form,
    Input,
    InputRef,
    Modal,
    Select,
    SelectProps,
    Space,
    Table,
    TableProps,
    Typography,
} from "antd";
import React, { useRef, useState } from "react";
import { FiInfo, FiKey, FiPlus, FiSettings } from "react-icons/fi";

const { Title, Text } = Typography;

const algorithmSelections: SelectProps["options"] = [
    {
        label: "Dilithium2 (default)",
        value: "dilithium2",
    },
    {
        label: "Dilithium3",
        value: "dilithium3",
    },
    {
        label: "Dilithium5",
        value: "dilithium5",
    },
];

const TableColumns: TableProps["columns"] = [
    {
        title: "Public key",
        dataIndex: "public_key",
        key: "public_key",
        render: (publicKey: string) => {
            return <Text copyable>{publicKey}</Text>;
        },
    },
    {
        title: "Secret key",
        dataIndex: "secret_key",
        key: "secret_key",
        render: (secretKey: string) => {
            return <Text copyable>{secretKey}</Text>;
        },
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, record) => {
            return (
                <Button onClick={() => console.log(record.keypair)}></Button>
            );
        },
    },
];

const SettingPage = ({ data }: { data: SettingPageData }) => {
    const [algorithm, setAlgorithm] = useState("dilithium2");
    const [isShowModalConfirmShowKeyPair, setIsShowModalConfirmShowKeyPair] =
        useState(false);
    const [keyPairs, setKeyPairs] = useState<Keypair[]>([]);
    const { message } = App.useApp();
    const [authenticationForm] = Form.useForm<KeyPairAuthenticationFormType>();
    const passwordInputRef = useRef<InputRef>(null);

    const handleCreateNewKeyPair = async () => {
        try {
            const res = await keypairService.create({ algorithm });

            router.reload();
            await message.success(res.data.message);
        } catch (err: any) {
            await message.error(err.data.message);
        }
    };

    const handleAuthenticateKeyPair = async (
        values: KeyPairAuthenticationFormType
    ) => {
        try {
            const res = await keypairService.getKeyPair({
                password: values.password,
            });
            setKeyPairs(res.data.keypair);
            setIsShowModalConfirmShowKeyPair(false);
            await message.success(res.data.message);
        } catch (err: any) {
            passwordInputRef.current?.focus();
            authenticationForm.setFieldValue("password", "");
            await message.error(err.data.message);
        }
    };

    const handleShowKeyPair = async () => {
        if (keyPairs.length) {
            setKeyPairs([]);

            await message.success("Hide key pair successfully");
        } else {
            setIsShowModalConfirmShowKeyPair(true);
        }
    };

    return (
        <>
            <Flex vertical>
                <Title className="flex items-center gap-2" level={4}>
                    <FiSettings />
                    Setting
                </Title>
                {!data.isSetKeypair && (
                    <Space className="mt-2 w-fit gap-4" direction="vertical">
                        <Text>
                            You have no keypair to sign the document, please
                            create one.
                        </Text>
                        <Select
                            className="min-w-[200px]"
                            onChange={(value) => setAlgorithm(value)}
                            defaultValue={"dilithium2"}
                            options={algorithmSelections}
                            placeholder="Select algorithm"
                        ></Select>
                        <Button
                            className="w-fit"
                            type="primary"
                            onClick={handleCreateNewKeyPair}
                        >
                            <FiKey />
                            Create new
                        </Button>
                    </Space>
                )}
                <Space direction="vertical">
                    <Text>
                        <Space>
                            <FiInfo />
                            You have setting your keypair, you can manage it
                            here.
                        </Space>
                    </Text>
                    <Space>
                        <Button onClick={handleShowKeyPair}>
                            <Space>
                                <FiKey />
                                {keyPairs.length ? (
                                    <Text>Hide key pair</Text>
                                ) : (
                                    <Text>Show key pair</Text>
                                )}
                            </Space>
                        </Button>

                        <Button onClick={handleCreateNewKeyPair}>
                            <FiPlus /> Gen new keypair
                        </Button>
                    </Space>
                </Space>

                {!keyPairs && (
                    <Table
                        className="mt-4"
                        locale={{
                            emptyText: "No key pairs was set",
                        }}
                        columns={TableColumns}
                        dataSource={keyPairs}
                    ></Table>
                )}
            </Flex>

            <Modal
                open={isShowModalConfirmShowKeyPair}
                cancelText="Cancel"
                okText="Get key"
                onCancel={() => setIsShowModalConfirmShowKeyPair(false)}
                onOk={() => {
                    authenticationForm.submit();
                }}
                afterOpenChange={(open) =>
                    open && passwordInputRef.current?.focus()
                }
            >
                <Title level={4}>Need authentication</Title>
                <Form
                    form={authenticationForm}
                    onFinish={handleAuthenticateKeyPair}
                    name="authenticationKeyPairForm"
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        name="password"
                        label="Your account password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            ref={passwordInputRef}
                            placeholder="Please enter password"
                        ></Input.Password>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SettingPage;
