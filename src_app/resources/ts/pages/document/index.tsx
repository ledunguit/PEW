import { DilithiumKeyPair } from "@/types";
import React from "react";
import { Button, Typography } from "antd";

const { Title, Text } = Typography;

const DocumentIndexPage = ({ keyPair }: { keyPair: DilithiumKeyPair }) => {
    return (
        <div>
            <Title level={4}>Tài liệu</Title>
            <Title level={5}>Dilithium Key Pair</Title>

            <Button type="primary" onClick={() => console.log(keyPair)}>
                Get new key pair
            </Button>
            <Text>
                <pre>{JSON.stringify(keyPair, null, 2)}</pre>
            </Text>
        </div>
    );
};

export default DocumentIndexPage;
