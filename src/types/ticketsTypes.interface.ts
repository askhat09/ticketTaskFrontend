export interface ticketsTypes {
  stop?: boolean;
  tickets?: Tickets[];
}

export interface Tickets {
  carrier: string;
  price: number;
  segments: Segments[];
}

export interface Segments {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops: [];
}
