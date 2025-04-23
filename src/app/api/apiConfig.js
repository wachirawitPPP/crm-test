export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://shop.api-apsx.co/crm';

export const API_PATHS = {
  auth: {
    checkLineId: "/auth/checklineid",
    login: "/auth/login",
    sendOtp: "/auth/otp",
  },
  appointment: {
    appointmentTopic: "/appointment/topic",
    appointmentTime: "/appointment/time",
    appointmentDoctor: "/appointment/doctor",
    appointmentList: "/appointment/list",
    appointmentAdd: "/appointment/add",
    appointmentApId: (apId) => `/appointment/${apId}`, 
  },
  customer: {
    customer: "/customer",
    customerOpdPagination: "/customer/opd/pagination",
    customerReceiptPagination: "/customer/receipt/pagination",
    customerHistoryLab: "/customer/history/lab",
    customerHistoryXray: "/customer/history/xray",
    customerHistoryDocument: "/customer/history/document",
  },
  queue: {
    queueMedicalcertPrint: (mdcId) => `/queue/medicalcert/print/${mdcId}`, 
    queueCheckLab: (queueId) => `/queue/check/lab/${queueId}`, 
    queueCheckXray: (queueId) => `/queue/check/xray/${queueId}`,
  },
  service: {
    serviceSearch: "/service/search",
    itemService: (serviceId) => `/service/id/${serviceId}`, 
    itemServiceUsed: (serviceId) => `/service/used/${serviceId}`, 
  },
  shop: {
    getShoplist: "/shop/getshop",
    shopOauth: "/shop/oauth",
  },
  receipt: {
    receiptDetail: (id) => `/receipt/${id}`, 
  },
};
