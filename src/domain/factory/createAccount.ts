import { Transaction } from '../entity/transaction.entity';
import { BankAccount } from '../entity/bankAccount';
import { SavingsAccount } from '../services/savingsAccount';
import { CurrentAccount } from '../services/currentAccount';
import { CreateBankAccountRequest } from '../entity/createBankAccountRequest';

export class CreateAccount{

  public createBankAccount(createRequest: CreateBankAccountRequest): BankAccount{
    switch (createRequest.type){
      case 'Ahorro':
        return new SavingsAccount(createRequest.name, 
          createRequest.city, createRequest.number, 0, []);
        
      case 'Corriente':
        return new CurrentAccount(createRequest.name, 
          createRequest.city, createRequest.number, 0, []);
    }
  }
}