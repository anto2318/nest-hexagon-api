export class CreateBankAccountResponse{
    constructor(
      public message: string,
      public typeBankAccountCreated?: string
    ){}
}