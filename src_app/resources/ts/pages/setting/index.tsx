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
    Typography,
} from "antd";
import React, { useRef, useState } from "react";
import { FiKey, FiSettings } from "react-icons/fi";

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

const SettingPage = ({ data }: { data: SettingPageData }) => {
    const [algorithm, setAlgorithm] = useState("dilithium2");
    const [isShowModalConfirmShowKeyPair, setIsShowModalConfirmShowKeyPair] =
        useState(false);
    const [keyPair, setKeyPair] = useState<Keypair | null>(null);
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
            setKeyPair(res.data.keypair);
            setIsShowModalConfirmShowKeyPair(false);
            await message.success(res.data.message);
        } catch (err: any) {
            passwordInputRef.current?.focus();
            authenticationForm.setFieldValue("password", "");
            await message.error(err.data.message);
        }
    };

    const handleShowKeyPair = async () => {
        if (keyPair) {
            setKeyPair(null);

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
                        You have setting the keypair. Click button below to
                        retrieve the keypair if you want.
                    </Text>
                    <Button onClick={handleShowKeyPair}>
                        <FiKey /> {keyPair ? "Hide key pair" : "Show key pair"}
                    </Button>
                </Space>

                {keyPair && (
                    <Space direction="vertical" className="mt-4">
                        <Form layout="vertical">
                            <Form.Item label="Public key">
                                <Input.Password
                                    value={keyPair?.public_key}
                                ></Input.Password>
                            </Form.Item>
                            <Form.Item label="Secret key">
                                <Input.Password
                                    value={keyPair?.secret_key}
                                ></Input.Password>
                            </Form.Item>
                        </Form>
                    </Space>
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
