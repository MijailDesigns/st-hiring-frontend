export interface GetSetting {
  success: boolean;
  data: Data;
}

export interface UpdateSetting {
  success: boolean;
  data: UpdateData;
  message: string;
}

export type UpdateData = Omit<Data, "_id">;

export type UpdateBody = Omit<Data, "_id" | "clientId">;

export interface Data {
  clientId: number;
  deliveryMethods: DeliveryMethod[];
  fulfillmentFormat: FulfillmentFormat;
  printer: Printer;
  printingFormat: PrintingFormat;
  scanning: Scanning;
  paymentMethods: PaymentMethods;
  ticketDisplay: TicketDisplay;
  customerInfo: CustomerInfo;
  _id: string;
}

export interface CustomerInfo {
  active: boolean;
  basicInfo: boolean;
  addressInfo: boolean;
}

export interface DeliveryMethod {
  name: string;
  enum: string;
  order: number;
  isDefault: boolean;
  selected: boolean;
}

export interface FulfillmentFormat {
  rfid: boolean;
  print: boolean;
}

export interface PaymentMethods {
  cash: boolean;
  creditCard: boolean;
  comp: boolean;
}

export interface Printer {
  id: null;
}

export interface PrintingFormat {
  formatA: boolean;
  formatB: boolean;
}

export interface Scanning {
  scanManually: boolean;
  scanWhenComplete: boolean;
}

export interface TicketDisplay {
  leftInAllotment: boolean;
  soldOut: boolean;
}
