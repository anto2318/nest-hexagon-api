import { BadRequestException, Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { FinancialMovementOrm } from '../database/entity/financialMovement.orm';
import { FinancialMovementInterface } from '../../domain/interfaces/financialMovementInterface';
import { FinancialMovement } from '../../domain/entity/financialMovement';
import { FinancialMovementDto } from '../../domain/dto/financialMovementDto';

export class FinancialMovementRepository implements FinancialMovementInterface {

  private readonly queryRunner: QueryRunner;

  constructor(@Inject('DATABASE_CONNECTION') private readonly asyncDatabaseConnection: Connection,
      private readonly repository: Repository<FinancialMovementOrm>) {

        this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
        this.asyncDatabaseConnection.getCustomRepository(FinancialMovementRepository);
        
    }
    
  async saveMovement(bankAccount: FinancialMovement): Promise<FinancialMovement> {
    const movement = await this.repository.save(bankAccount);

    const movementResponseDto = plainToClass(FinancialMovementDto, movement);

    const errors = await validate(movementResponseDto);

    if (errors.length) {
      throw new BadRequestException('Not found');
    }
    
    return movementResponseDto;

  }

  async searchAllById(id: String): Promise<FinancialMovement[]> {
    const movements = await this.repository.find({ where: { bankAccount: id} });

      let movementsResponseDto = [];
      
      movements.forEach(movement => {
        movementsResponseDto.push(plainToClass(FinancialMovementDto, movement));
      });

      if (!movementsResponseDto.length) {
        throw new BadRequestException('Not found');
      }
      
      return movementsResponseDto;
  }

}