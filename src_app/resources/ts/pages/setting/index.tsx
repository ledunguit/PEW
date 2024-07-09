import { ROUTES } from "@/route";
import { keypairService } from "@/services";
import { SettingPageData } from "@/types";
import { router } from "@inertiajs/react";
import {
    App,
    Button,
    Flex,
    Select,
    SelectProps,
    Space,
    Typography,
} from "antd";
import React, { useState } from "react";
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
    const { message } = App.useApp();

    const handleCreateNewKeyPair = async () => {
        try {
            const res = await keypairService.create({ algorithm });

            router.reload();
            await message.success(res.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Flex vertical>
            <Title className="flex items-center gap-2" level={4}>
                <FiSettings />
                Setting
            </Title>
            {data.isSetKeypair && (
                <Space className="mt-2 w-fit gap-4" direction="vertical">
                    <Text>
                        You have no keypair to sign the document, please create
                        one.
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
        </Flex>
    );
};

export default SettingPage;
