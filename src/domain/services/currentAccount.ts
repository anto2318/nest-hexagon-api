import { Transaction } from '../entity/transaction.entity';
import { BankAccount} from '../entity/bankAccount';
import { FinancialMovement } from '../entity/financialMovement';

export class CurrentAccount extends BankAccount{

  public _minimumWithdrawal = -100000;

  constructor(name: string, city: string, number: string, balance: number, movements: FinancialMovement[]) {
    super();
    this.name = name; 
    this.city = city;
    this.number = number;
    this.balance = balance;
    this.movements = movements;
  }
  
  public consign(transaction: Transaction) {
    if(this.verifyFirstConsign() && transaction.value >= 100000){
      super.consign(transaction);
    }else if(!this.verifyFirstConsign()){
      super.consign(transaction);
    }
  }

  withdrawal(transaction: Transaction) {
    let newBalance: number = this.balance - this.applyTax(transaction.value);
    if(newBalance >= this._minimumWithdrawal){
      let movement: FinancialMovement = new FinancialMovement();
      movement.withdrawalValue = transaction.value;
      movement.movementDate = Date();
      this.balance = newBalance;
      this.movements.push(movement);
    }
  }

  private verifyFirstConsign() : boolean {
    return this.movements.length == 0;
  }

  private applyTax(value: number): number {
    return (value + (value * 4 / 1000));
  }

}