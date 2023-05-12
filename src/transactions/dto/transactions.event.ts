import { Transaction } from './transaction';
export class TransactionEvent {
  transactions: Array<Transaction>;
  constructor(transactions: Array<Transaction>) {
    this.transactions = transactions;
  }
}