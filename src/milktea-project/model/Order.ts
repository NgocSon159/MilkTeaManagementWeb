export interface Order {
    orderId?: string;
    branchId: string;
    createdOn?: string;
    createdBy?: string;
    servedOn?: string;
    servedBy?: string;
    completedOn?: string;
    completedBy?: string;
    tableId?: number;
    timeDone?: number;
    phoneNumber?: string;
    discount?: number;
    total?: number;
    cash?: number;
    change?: number;
    status?: boolean;
    foods?: any;
}
