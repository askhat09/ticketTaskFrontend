export interface ticketsTypes {
  stop?: boolean;
  tickets?: Result[];
}

export interface Result {
  carrier: string;
  price: number;
  segments: Segments[];
}

export interface Segments {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops?: [];
}
