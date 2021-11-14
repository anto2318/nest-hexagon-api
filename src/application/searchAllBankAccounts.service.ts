import { BankAccountOrm } from '../infrastructure/database/entity/bankAccount.orm';
import { BankAccountInterface} from '../domain/interfaces/bankAccountInterface';
import { FinancialMovementInterface } from '../domain/interfaces/financialMovementInterface';
import { SearchAllBankAccountsResponse } from '../domain/entity/searchBankAccountResponse.entity';
export class SearchAllBankAccountsService{

  constructor(private readonly financialMovement: FinancialMovementInterface,
    private readonly bankAccountInterface: BankAccountInterface) {}

  async execute() : Promise<SearchAllBankAccountsResponse>{
    const accounts: BankAccountOrm[] = await this.bankAccountInterface.searchAccounts();
    for (let i = 0; i < accounts.length; i++){
      await this.bankAccountInterface.start();
      accounts[i].movements = await this.financialMovement.searchAllById({ where: { bankAccount: accounts[i].number}});
    }
    return new SearchAllBankAccountsResponse(accounts);
  }

}

