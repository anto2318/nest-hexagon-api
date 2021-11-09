import { Module } from '@nestjs/common';
import { GetAllBankAccountsController } from './getAllBankAccounts.controller';
import { CreateBankAccountController } from './createBankAccount.controller';
import { ConsignBankAccountController } from './consignBankAccount.controller';

@Module({
  imports: [GetAllBankAccountsController, CreateBankAccountController, ConsignBankAccountController],
})
export class ControllersModule{}