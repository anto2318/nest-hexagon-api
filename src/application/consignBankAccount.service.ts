import { BankAccount } from '../domain/entity/bankAccount';
import { ConsignAccount } from '../domain/factory/consignAccount';
import { BankAccountInterface} from '../domain/interfaces/bankAccountInterface';
import { FinancialMovementInterface } from '../domain/interfaces/financialMovementInterface';
import { ConsignBankAccountRequest } from '../domain/entity/consignBankAccountRequest';
import { ConsignBankAccountResponse } from '../domain/entity/consignBankAccountResponse';
export class ConsignBankAccountService{
  
  constructor(private readonly financialMovementInterface: FinancialMovementInterface,
    private readonly bankAccountInterface: BankAccountInterface) {}

  async execute(cosignRequest: ConsignBankAccountRequest) : Promise<ConsignBankAccountResponse>{
    
    const accountOrm = await this.bankAccountInterface.searchOne(cosignRequest.number);
    accountOrm.movements = await this.financialMovementInterface.searchAllById({ where: { bankAccount: accountOrm.number}});
    
    if(accountOrm != undefined){
      const bankAccount: BankAccount = new ConsignAccount().cosignBankAccount(cosignRequest, accountOrm);
      await this.bankAccountInterface.start();
      await this.bankAccountInterface.saveAccount(bankAccount);
      await this.financialMovementInterface.saveMovement(bankAccount.movements[bankAccount.movements.length - 1]);
      return new ConsignBankAccountResponse('Se consignaron ' + cosignRequest.value + ' a la cuenta: ' + bankAccount.number + ' balance total: ' + bankAccount.balance);
    }

    return new ConsignBankAccountResponse('El numero de cuenta no existe');
  }

}
