import { Transaction } from "./transaction.entity";
import { FinancialServicesInterface } from '../interfaces/financialServicesInterface';
import { FinancialMovement } from './financialMovement';

export class BankAccount implements FinancialServicesInterface{

  public balance: number;
  public name: string;
  public number: string;
  public city: string;
  public movements: FinancialMovement[];

  constructor() {
    this.balance = 0;
    this.movements = [];
  }

  public consign(transaction: Transaction) {
    const movement: FinancialMovement = new FinancialMovement();
    movement.bankAccount = this.number;
    movement.consignValue = parseInt(transaction.value.toString());
    movement.movementDate = Date();
    movement.withdrawalValue = 0;
    this.balance += movement.consignValue;
    this.movements.push(movement);
  }

  public move(financialService: FinancialServicesInterface, transaction: Transaction) {
    this.withdrawal(transaction);
    financialService.consign(transaction);
  }

  public withdrawal(transaction: Transaction) {
    this.balance -= transaction.value;
  }

}