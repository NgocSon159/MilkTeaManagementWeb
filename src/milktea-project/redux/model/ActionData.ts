import { any } from "prop-types";

export interface ActionData{
    type: string;
    tables?: any;
    data?: any;
    routeInfos?: any;
    order?: any;
    formInfo?: any;
    loginInfo?: any;
    food?: any;
    orderList?: any;
    pageFood? :any; // data for Page Food

    paymentTables?: any;
}
