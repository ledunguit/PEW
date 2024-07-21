import {Keypair, SettingPageData,} from "@/types";
import {App, Button, Flex, Space, Table, TableProps, Typography,} from "antd";
import React, {useState} from "react";
import {FiSettings} from "react-icons/fi";

const {Title, Text} = Typography;

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

const SettingPage = ({data}: { data: SettingPageData }) => {
    const [keyPairs, setKeyPairs] = useState<Keypair[]>([]);

    console.log("data:", data);

    if (!data.isJoinedProject) {
        return (
            <>
                <Title className="flex items-center gap-2" level={4}>
                    <FiSettings/>
                    Setting
                </Title>

                <Text>You have not joined any project. Please contact admin for more information.</Text>
            </>
        );
    }


    return (
        <>
            <Flex vertical>
                <Title className="flex items-center gap-2" level={4}>
                    <FiSettings/>
                    Setting
                </Title>
                {!data.isSetKeypair && (
                    <Space className="mt-2 w-fit gap-4" direction="vertical">
                        <Text>
                            You have no keypair to sign the document, please contact admin for more information.
                        </Text>
                    </Space>
                )}

                {keyPairs.length > 0 && (
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
        </>
    );
};

export default SettingPage;
