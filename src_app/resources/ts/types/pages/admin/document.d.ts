export type AdminDocument = {
    id: number;
    document_name: string;
    signature: string;
    created_at: string;
    created_by: {
        name: string;
    };
    project: {
        id: number;
        name: string;
        project_id: string;
        company_name: string;
        number_of_employees: number;
        start_date: string;
        end_date: string;
    };
};

export type DocumentIndexPageData = {
    documents: AdminDocument[];
};
