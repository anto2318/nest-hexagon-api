import { BadRequestException, Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm';
import { BankAccountOrm } from '../database/entity/bankAccount.orm';
import { BankAccountInterface } from '../../domain/interfaces/bankAccountInterface';
import { BankAccount } from '../../domain/entity/bankAccount';
import { BankAccountDto } from '../../domain/dto/bankAccountDto';

export class BankAccountRepository implements BankAccountInterface {

    private readonly queryRunner: QueryRunner;
    private transactionManager: EntityManager;

    constructor(@Inject('DATABASE_CONNECTION') private readonly asyncDatabaseConnection: Connection,
      private readonly repository: Repository<BankAccountOrm>) {

        this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
        this.asyncDatabaseConnection.getCustomRepository(BankAccountRepository);
        
    }

    async searchAccounts(): Promise<BankAccount[]> {

      const accounts = await this.repository.find();

      let accountsResponseDto = [];
      
      accounts.forEach(account => {
        accountsResponseDto.push(plainToClass(BankAccountDto, account));
      });

      if (!accountsResponseDto.length) {
        throw new BadRequestException('Not found');
      }
      
      return accountsResponseDto;

    }

    async searchOne(number: string): Promise<BankAccount> {
      const accounts = await this.repository.findOne(number);

      const accountResponseDto = plainToClass(BankAccountDto, accounts);

      const errors = await validate(accountResponseDto);

      if (errors.length) {
        throw new BadRequestException('Not found');
      }
      
      return accountResponseDto;
    }

    async saveAccount(bankAccount: BankAccount): Promise<BankAccount> {
      const accounts = await this.repository.save(bankAccount);

      const accountResponseDto = plainToClass(BankAccountDto, accounts);

      const errors = await validate(accountResponseDto);

      if (errors.length) {
        throw new BadRequestException('Not found');
      }
      
      return accountResponseDto;
    }

    setTransactionManager(){
        this.transactionManager = this.queryRunner.manager;
    }

    async complete(work: () => any): Promise<any> {
        try{
          const response = await work();
          await this.queryRunner.commitTransaction();
          return response;
        }catch (error){
          await this.queryRunner.rollbackTransaction();
          return error.toString();
        }finally {
          await this.queryRunner.release();
        }
      }
    
      async start() {
        await this.queryRunner.startTransaction();
        this.setTransactionManager();
      }
    

}