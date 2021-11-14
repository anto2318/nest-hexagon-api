import { BankAccount } from '../entity/bankAccount';

export interface BankAccountInterface{

  searchAccounts(): Promise<BankAccount[]>;
  searchOne(number: string): Promise<BankAccount>;
  saveAccount(bankAccount: BankAccount): Promise<BankAccount>;
  start(): void;
  complete(work: () => any): Promise<any>;
  
}