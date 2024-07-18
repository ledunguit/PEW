import React from "react";
import AuthLayout from "@/layouts/auth";
import type { FormProps } from "antd";
import {
    Button,
    Typography,
    App,
    Checkbox,
    Form,
    Input,
    Flex,
    Space,
} from "antd";
import { Link, router } from "@inertiajs/react";
import { BsSafe2Fill } from "react-icons/bs";
import { IoLogIn, IoLogoGoogle } from "react-icons/io5";
import { LoginFormDataType } from "@/types";

const { Title, Text } = Typography;

const LoginPage = () => {
    const { message } = App.useApp();
    const [errors, setErrors] = React.useState<LoginFormDataType>({});

    const onFinish: FormProps<LoginFormDataType>["onFinish"] = (values) => {
        router.post("login", values, {
            onSuccess: () => {
                message.success("Login successfully");
            },
            onError: (errors) => {
                setErrors(errors);
            },
            replace: true, // Replace the current page in the history stack
            preserveState: false,
        });
    };

    return (
        <Space className="gap-4" direction="vertical">
            <Space align="center" className="w-fit">
                <BsSafe2Fill style={{ fontSize: 60 }} />
                <Text className="text-2xl">
                    FileOQS - Internal File Sharing
                </Text>
            </Space>
            <Space direction="vertical" className="w-[400px]">
                <Title level={4}>Login to your account</Title>
                <Form
                    className="w-full"
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<LoginFormDataType>
                        label="Email"
                        name="email"
                        validateStatus={errors.email ? "error" : undefined}
                        help={errors.email ? errors.email : undefined}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<LoginFormDataType>
                        label="Password"
                        name="password"
                        validateStatus={errors.password ? "error" : undefined}
                        help={errors.password ? errors.password : undefined}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<LoginFormDataType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Flex gap={10} vertical>
                        <Flex gap={10}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<IoLogIn />}
                            >
                                Login
                            </Button>
                            <Button icon={<IoLogoGoogle color="red" />}>
                                Login with Google
                            </Button>
                        </Flex>

                        <Flex justify="space-between">
                            <Text>
                                Don't have an account?{" "}
                                <Link type="link" href="/register">
                                    Register
                                </Link>
                            </Text>
                            <Text>
                                <Link type="link" href="/forgot-password">
                                    Forgot password?
                                </Link>
                            </Text>
                        </Flex>
                    </Flex>
                </Form>
            </Space>
        </Space>
    );
};

LoginPage.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default LoginPage;
