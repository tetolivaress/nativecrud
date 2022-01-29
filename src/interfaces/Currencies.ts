export interface CurrencyDetails {
  [date: number]: Details;
  name: string;
}

export interface Details {
  [hour: string]: Hour;
}

export interface Hour {
  amount: string;
}

export interface CurrencyToEdit {
  date: string;
  hour: string;
  amount: number;
  name: string;
}
