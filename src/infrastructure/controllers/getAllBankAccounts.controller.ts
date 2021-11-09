import { Controller, Get } from '@nestjs/common';
import {
  SearchAllBankAccountsResponse, 
  SearchAllBankAccountsService,
} from '../../application/searchAllBankAccounts.service';
import { UnitOfWork } from '../unitOfWork/unitOfWork';

@Controller('getAllBankAccount')
export class GetAllBankAccountsController{
  constructor(private readonly _unitOfWork: UnitOfWork) {}


  @Get()
  async getAllBankAccounts(){
    const res: SearchAllBankAccountsResponse = await this._unitOfWork.complete(async () => await new SearchAllBankAccountsService(this._unitOfWork).execute());
    return res;
  }

}