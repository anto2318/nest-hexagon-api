import { BankAccount } from '../domain/entity/bankAccount';
import { BankAccountInterface} from '../domain/interfaces/bankAccountInterface';
import { CreateAccount } from '../domain/factory/createAccount';
import { CreateBankAccountRequest } from '../domain/entity/createBankAccountRequest';
import { CreateBankAccountResponse } from '../domain/entity/createBankAccountResponse';
export class CreateBankAccountService{

  constructor(private readonly bankAccountInterface: BankAccountInterface) {}

  public async execute(createRequest: CreateBankAccountRequest): Promise<CreateBankAccountResponse>{

    let newBankAccount: BankAccount;
    const bankAccount = await this.bankAccountInterface.searchOne(createRequest.number);
    if (bankAccount == undefined){
      newBankAccount = new CreateAccount().createBankAccount(createRequest);
      await this.bankAccountInterface.start();
      const savedData = await this.bankAccountInterface.saveAccount(newBankAccount);
      return new CreateBankAccountResponse('Cuenta de '+ createRequest.type + ' ' + savedData.number + ' creada satisfactoriamente');
    }
    return new CreateBankAccountResponse('El numero de cuenta ya existe');
  }
}
