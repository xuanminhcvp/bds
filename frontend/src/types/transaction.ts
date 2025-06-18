export interface TransactionDepositCreate {
    amount: number;
    transaction_type: string;
}

export interface TransactionPaymentCreate {
    amount: number;
    transaction_type: string;
    property_id: number;
}

export interface TransactionPaymentCreateProject {
    amount: number;
    transaction_type: string;
    project_id: number;
}