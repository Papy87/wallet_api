import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey_auth,guars';
import { CreateTransactionRequest } from './dto/create_transactions-request';

@Controller('transactions')
@UseGuards(ApiKeyAuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post('')
  createTransaction(
    @Body() createTransactionRequest: CreateTransactionRequest,
  ) {
    try {
      this.transactionService.createTransactions(createTransactionRequest);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
