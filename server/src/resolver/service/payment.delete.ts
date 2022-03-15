import { Payment } from 'src/_entities';
import { Repository } from 'typeorm';

import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';

import { KBTypeOrmQueryService } from './kbtypeorm.service';

@QueryService(Payment)
export class PaymentDeleteService extends KBTypeOrmQueryService<Payment> {
  constructor(@InjectRepository(Payment) repo: Repository<Payment>) {
    // pass the use soft delete option to the service.
    super(repo, { useSoftDelete: true });
  }
}
