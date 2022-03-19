import { Query } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

export class KBTypeOrmQueryService<Entity> extends TypeOrmQueryService<Entity> {
  async query(query: Query<Entity>): Promise<Entity[]> {
    return this.filterQueryBuilder.select(query).withDeleted().getMany();
  }

}
