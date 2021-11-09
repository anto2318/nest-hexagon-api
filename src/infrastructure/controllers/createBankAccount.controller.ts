import { Body, Controller, Post, } from '@nestjs/common';
import {CreateBankAccountRequest,
        CreateBankAccountResponse, 
        CreateBankAccountService 
} from '../../application/createBankAccount.service';
import { UnitOfWork } from '../unitOfWork/unitOfWork';

@Controller('createBankAccount')
export class CreateBankAccountController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async createBankAccount(@Body() request: CreateBankAccountRequest){
    const service: CreateBankAccountService = new CreateBankAccountService(this._unitOfWork);
    const res: CreateBankAccountResponse = await this._unitOfWork.complete(async () => await service.execute(request));
    return res.message;
  }

}