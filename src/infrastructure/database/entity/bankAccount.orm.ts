import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { FinancialMovementOrm } from './financialMovement.orm';

@Entity()
export class BankAccountOrm{

  @Column()
  public balance: number;

  @Column()
  public name: string;

  @PrimaryColumn()
  public number: string;

  @Column()
  public city: string;

  @OneToMany(type => FinancialMovementOrm, financialMovement => financialMovement.bankAccount)
  public movements: FinancialMovementOrm[];

}