import { BankAccountOrm } from '../domain/entity/bankAccount.orm';
import { IUnitOfWork } from '../domain/interfaces/unitOfWork.interface';

export class SearchAllBankAccountsService{

  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  async execute() : Promise<SearchAllBankAccountsResponse>{
    const accounts: BankAccountOrm[] = await this._unitOfWork.bankAccountRepository.find();
    for (let i = 0; i < accounts.length; i++){
      await this._unitOfWork.start();
      accounts[i].movements = await this._unitOfWork.financialMovementRepository.find({ where: { bankAccount: accounts[i].number}});
    }
    console.log(accounts);
    return new SearchAllBankAccountsResponse(accounts);
  }

}

export class SearchAllBankAccountsResponse{
  constructor(public readonly accounts: BankAccountOrm[]) {}
}
