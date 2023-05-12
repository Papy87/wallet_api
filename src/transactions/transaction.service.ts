import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionRequest } from './dto/create_transactions-request';
import { Transaction } from './dto/transaction';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionEvent } from './dto/transactions.event';
@Injectable()
export class TransactionService {
  private sorted_transactions: Transaction[] = [];
  constructor(
    @Inject('TRANSACTIONS') private readonly transactionClient: ClientProxy,
  ) {}

  createTransactions(createTransactionRequest: CreateTransactionRequest) {
    this.sorted_transactions = this.sortTransactions(
      createTransactionRequest.transactions,
    );
    this.crateChunk(this.sorted_transactions);
  }
  sortTransactions(data: Transaction[]): Transaction[] {
    data.sort((a, b) => {
      return b['value'] - a['value'];
    });
    return data;
  }
  async crateChunk(data: Transaction[]): Promise<number> {
    let transaction_data: Transaction[] = [...data];
    while (transaction_data.length) {
      const chunk_data: Transaction[] = [];
      const rest_transactions: Transaction[] = [];
      let total_latency = 0;
      for (const current_data of transaction_data) {
        const current_transaction: Transaction = current_data;
        const current_latency: number = current_transaction.latency;
        if (total_latency + current_latency <= 1000) {
          total_latency += current_latency;
          chunk_data.push(current_transaction);
        } else {
          rest_transactions.push(current_transaction);
        }
      }
      this.transactionClient.emit(
        'add-transactions',
        new TransactionEvent(chunk_data),
      );
      transaction_data = rest_transactions;
    }
    return 200;
  }
}
