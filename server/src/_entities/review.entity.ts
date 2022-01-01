import { FilterableField, IDField, Relation } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pack, User } from '.';

@ObjectType()
@Entity('review')
@Relation('user', () => User, { disableRemove: true })
@Relation('pack', () => Pack, { disableRemove: true })
export class Review extends BaseEntity {
  @IDField(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id?: number;

  @Column('varchar', { name: 'about', nullable: true, length: 255 })
  @Field()
  review: string | null;

  @FilterableField(() => ID)
  @Column('int')
  userId: number;

  @FilterableField(() => ID)
  @Column('int')
  packId: number;

  @ManyToOne(() => Pack, (pack) => pack.reviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  pack: Pack;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user: User;
}
