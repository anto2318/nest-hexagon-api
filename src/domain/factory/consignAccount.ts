import { Transaction } from '../entity/transaction.entity';
import { BankAccount } from '../entity/bankAccount';
import { SavingsAccount } from '../services/savingsAccount';
import { CurrentAccount } from '../services/currentAccount';
import { ConsignBankAccountRequest } from '../entity/consignBankAccountRequest';

export class ConsignAccount{

  public cosignBankAccount(consignRequest: ConsignBankAccountRequest, data: any): BankAccount{
    switch (consignRequest.type){
      case 'Ahorro':
        const savingsAccount = new SavingsAccount(data.name, 
          data.city, data.number, data.balance, data.movements);
        savingsAccount.consign(new Transaction(consignRequest.value, consignRequest.city));
        
        return savingsAccount;
      case 'Corriente':
        const currentAccount = new CurrentAccount(data.name, 
          data.city, data.number, data.balance, data.movements);
        currentAccount.consign(new Transaction(consignRequest.value, consignRequest.city));
        
        return currentAccount;
    }
  }
}