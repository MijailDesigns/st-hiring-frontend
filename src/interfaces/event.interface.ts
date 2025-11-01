export interface EventItem {
  id: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  availableTickets: AvailableTicket[];
}

export interface AvailableTicket {
  id: number;
  event_id: number;
  status: Status;
  type: Type;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export enum Status {
  Available = "available",
}

export enum Type {
  General = "general",
}
