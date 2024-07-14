import React from "react";
import {
    Layout,
    Flex,
    Typography,
    Dropdown,
    Avatar,
    MenuProps,
    App,
} from "antd";
import { BsSafe2Fill } from "react-icons/bs";
import { LuUserCircle } from "react-icons/lu";
import { Link, router } from "@inertiajs/react";
import { FiUser } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { ROUTES } from "@/route";
import { AuthData } from "@/types";

const { Header } = Layout;
const { Text, Title } = Typography;

const Headerbar = ({ auth, isAdmin }: { auth: AuthData; isAdmin: boolean }) => {
    const { message } = App.useApp();
    const handleLogout = () => {
        router.visit(ROUTES.LOGOUT, {
            method: "post",
            onStart: () => {
                message.loading("Logging out...");
            },
        });
    };

    const dropdownItems: MenuProps["items"] = [
        {
            key: "account",
            label: (
                <Link
                    href={isAdmin ? ROUTES.ADMIN.PROFILE : ROUTES.USER.PROFILE}
                    className="flex gap-2 items-center"
                >
                    <FiUser />
                    <Text>Account</Text>
                </Link>
            ),
        },
        {
            key: "logout",
            label: (
                <Text
                    onClick={handleLogout}
                    className="flex gap-2 items-center"
                >
                    <IoLogOut />
                    <Text>Logout</Text>
                </Text>
            ),
        },
    ];

    return (
        <Header
            style={{
                padding: "0 20px",
                background: "white",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.1)",
            }}
        >
            <Flex justify="space-between" className="w-full">
                <Flex justify="center" align="center" gap={10}>
                    <BsSafe2Fill style={{ fontSize: 30 }} />
                    <Title level={5} style={{ margin: 0 }}>
                        LeDung OQS - Internal file sharing
                    </Title>
                </Flex>
                <Dropdown
                    menu={{ items: dropdownItems }}
                    placement="bottom"
                    arrow
                >
                    <Flex
                        className="hover:cursor-pointer hover:shadow rounded-full px-5 py-2"
                        align="center"
                        gap={10}
                    >
                        <Text>{auth.user.name}</Text>
                        <Avatar size={30} icon={<LuUserCircle />} />
                    </Flex>
                </Dropdown>
            </Flex>
        </Header>
    );
};

export default Headerbar;
