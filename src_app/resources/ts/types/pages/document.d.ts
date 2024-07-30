export type Document = {
    id: number;
    document_name: string;
    created_by: {
        id: number;
        name: string;
    };
    created_at: string;
    signature: string;
};
