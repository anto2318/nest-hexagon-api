import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { FinancialMovement } from '../entity/financialMovement';

@Exclude()
export class FinancialMovementDto extends FinancialMovement{
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  bankAccount: string;

  @Expose()
  @IsNumber()
  consignValue: number;

  @Expose()
  @IsNumber()
  withdrawalValue: number;

  @Expose()
  @IsString()
  city: string;

  @Expose()
  @IsString()
  movementDate: string;
}
