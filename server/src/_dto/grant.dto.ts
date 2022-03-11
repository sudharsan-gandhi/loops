import { GrantActions } from 'src/_entities';
import {
  BaseEntity,
  Column,
} from 'typeorm';

import { FilterableField } from '@nestjs-query/query-graphql';
import {
  ID,
  InputType,
} from '@nestjs/graphql';

@InputType()
export class GrantDTO extends BaseEntity {
  @FilterableField({ description: 'Example field (placeholder)' })
  role: string;

  @FilterableField({ description: 'Example field (placeholder)' })
  resource: string;

  @FilterableField(() => GrantActions)
  action: GrantActions;

  @FilterableField({
    description: `
      all attributes => ['*'],
      all attributes except specific fields => ['*', '!id']
      only selected attributes => ['id', 'name']
      `,
  })
  @Column('varchar', { name: 'resource', length: 30, nullable: false })
  attributes: string;

  @FilterableField(() => ID)
  postedById: number;
}
