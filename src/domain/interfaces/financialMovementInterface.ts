import { FinancialMovement, FinancialMovement as FinancialMovementEntity} from '../entity/financialMovement';

export interface FinancialMovementInterface{

  searchAllById(id: any): Promise<FinancialMovement[]>;
  saveMovement(bankAccount: FinancialMovementEntity): Promise<FinancialMovementEntity>;
  
}