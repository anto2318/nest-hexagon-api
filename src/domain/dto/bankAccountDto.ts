import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { FinancialMovement } from '../entity/financialMovement';
import { BankAccount } from '../entity/bankAccount';

@Exclude()
export class BankAccountDto extends BankAccount{
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  balance: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  number: string;

  @Expose()
  @IsString()
  city: string;

  @Expose()
  movements: FinancialMovement[];
}
