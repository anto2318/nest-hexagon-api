import { Body, Controller, Post, } from '@nestjs/common';
import { CreateBankAccountService } from '../../application/createBankAccount.service';
import { CreateBankAccountRequest } from '../../domain/entity/createBankAccountRequest';
import { CreateBankAccountResponse } from '../../domain/entity/createBankAccountResponse';
import { BankAccountRepository } from '../repositories/bankAccount.repository';

@Controller('createBankAccount')
export class CreateBankAccountController{

  constructor(private readonly _bankAccountRepository: BankAccountRepository,
    private readonly createBankAccountService: CreateBankAccountService) {}

  @Post()
  async createBankAccount(@Body() request: CreateBankAccountRequest){
    const res: CreateBankAccountResponse = await this._bankAccountRepository.complete(
      async () => await this.createBankAccountService.execute(request)
    );
    return res.message;
  }

}