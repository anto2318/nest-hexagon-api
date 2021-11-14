import { Controller, Get } from '@nestjs/common';
import { SearchAllBankAccountsService } from '../../application/searchAllBankAccounts.service';
import { SearchAllBankAccountsResponse } from '../../domain/entity/searchBankAccountResponse.entity';
import { BankAccountRepository } from '../repositories/bankAccount.repository';
@Controller('getAllBankAccount')
export class GetAllBankAccountsController{

  constructor(private readonly _bankAccountRepository: BankAccountRepository,
    private readonly searchAllBankAccountsService: SearchAllBankAccountsService) {}

  @Get()
  async getAllBankAccounts(){
    const res: SearchAllBankAccountsResponse = await this._bankAccountRepository.complete(
      async () => await this.searchAllBankAccountsService.execute()
    );
    return res;
  }
}