export type Document = {
    id: number;
    document_name: string;
    project_id: number;
    created_by: {
        id: number;
        name: string;
    };
    created_at: string;
    signature: string;
};
