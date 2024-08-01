export type Signer = {
    id: number;
    name: string;
};

export type VerifyDocumentPageData = {
    signers: Signer[];
};
