import { Body, Controller, Put } from '@nestjs/common';
import { ConsignBankAccountService } from '../../application/consignBankAccount.service';
import { ConsignBankAccountRequest } from '../../domain/entity/consignBankAccountRequest';
import { ConsignBankAccountResponse } from '../../domain/entity/consignBankAccountResponse';
import { BankAccountRepository } from '../repositories/bankAccount.repository';

@Controller('cosignBankAccount')
export class ConsignBankAccountController{

  constructor(private readonly _bankAccountRepository: BankAccountRepository, 
    private readonly consignBankAccountService: ConsignBankAccountService) {}

  @Put()
  async consignBankAccount(@Body() request: ConsignBankAccountRequest){
    const res: ConsignBankAccountResponse = await this._bankAccountRepository.complete(
      async () => await this.consignBankAccountService.execute(request)
    )
    return res.message;
  }

}