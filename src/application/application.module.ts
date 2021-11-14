import { Module } from '@nestjs/common';
import {
  CreateBankAccountService,
} from './createBankAccount.service';
import { BankAccount } from '../domain/entity/bankAccount';
import { ConsignBankAccountService } from './consignBankAccount.service';
import { SearchAllBankAccountsService } from './searchAllBankAccounts.service';

@Module({
  imports: [
    BankAccount,
    CreateBankAccountService,
    ConsignBankAccountService,
    SearchAllBankAccountsService
  ],
  exports: [
    CreateBankAccountService,
    ConsignBankAccountService,
    SearchAllBankAccountsService
  ]
})
export class ApplicationModule{}