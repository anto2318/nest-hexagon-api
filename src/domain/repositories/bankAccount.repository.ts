import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { GenericRepository } from '../base/generic.repository';
import { BankAccountOrm } from '../entity/bankAccount.orm';

@Injectable()
@EntityRepository(BankAccountOrm)
export class BankAccountRepository extends GenericRepository<BankAccountOrm>{}