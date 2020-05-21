export interface Visitor {
  email: string;
  ip: string;
  loc: string;
  message: string;
}

export interface Customer extends Visitor {
  expenses: number;
  ordersCount: number;
}
