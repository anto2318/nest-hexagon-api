import { Body, Controller, Put } from '@nestjs/common';
import {
  ConsignBankAccountRequest, 
  ConsignBankAccountResponse, 
  ConsignBankAccountService, 
} from '../../application/consignBankAccount.service';
import { UnitOfWork } from '../unitOfWork/unitOfWork';

@Controller('cosignBankAccount')
export class ConsignBankAccountController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Put()
  async consignBankAccount(@Body() request: ConsignBankAccountRequest){
    const service: ConsignBankAccountService = new ConsignBankAccountService(this._unitOfWork);
    const res: ConsignBankAccountResponse = await this._unitOfWork.complete(async () => await service.execute(request))
    return res.message;
  }

}