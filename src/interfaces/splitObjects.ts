/** @format */

export type SplitTransactionType = {
  type: "PAY" | "RECEIVE";
  personId: string;
  name: string;
  amount: number;
};
export type SplitType = {
  personId: string;
  name: string;
  endingBalance: number;
  transactions: SplitTransactionType[];
};
