import { Transaction } from '../entity/transaction.entity';

export interface FinancialServicesInterface {

  name: string;
  number: string;
  balance: number;

  consign(transaction: Transaction);
  withdrawal(transaction: Transaction);
  move(financialService: FinancialServicesInterface, transaction: Transaction);
}