import { Connection } from 'typeorm';
import { BankAccountOrm } from '../entity/bankAccount.orm';
import { FinancialMovementOrm } from '../entity/financialMovement.orm';


export const bankAccountProviders = [
  {
    provide: 'BANK_ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(BankAccountOrm),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const financialMovementsProviders = [
  {
    provide: 'FINANCIAL_MOVEMENTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(FinancialMovementOrm),
    inject: ['DATABASE_CONNECTION'],
  },
];