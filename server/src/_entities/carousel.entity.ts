import {
  CarouselAuthorizer,
} from 'src/resolver/authorizer/carousel.authorizer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
} from '@nestjs/graphql';

import { Pack } from './pack.entity';
import { User } from './user.entity';

@Entity('carousel')
@ObjectType('carousel')
@Relation('pack', () => Pack, { disableRemove: true })
@Relation('author', () => User, { disableRemove: true })
@Authorize(CarouselAuthorizer)
export class Carousel extends BaseEntity {
  @IDField(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number;

  @Column('varchar', { name: 'password', nullable: false })
  @Field()
  image: string | null;

  @FilterableField(() => ID)
  @Column('int')
  packId: number;

  @ManyToOne(() => Pack, (pack) => pack.carousels, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  pack: Pack;

  @FilterableField(() => ID)
  @Column('int')
  authorId: number;

  @ManyToOne(() => User, (user) => user.carousels, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  author: User;

  @Column('datetime', {
    name: 'postDate',
  })
  @FilterableField(() => GraphQLTimestamp)
  @CreateDateColumn()
  postDate: Date;

  @FilterableField(() => GraphQLTimestamp, {
    description: 'Example field (placeholder)',
  })
  @Column('datetime', { name: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @FilterableField(() => GraphQLTimestamp, {
    defaultValue: null,
    nullable: true,
  })
  deletedAt?: Date;
}
