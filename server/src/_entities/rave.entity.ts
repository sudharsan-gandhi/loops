import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from 'src/_entities/user.entity';


@ObjectType()
@Index("Rave_followerId_followingId_key", ["followerId", "followingId"], {
  unique: true,
})
@Index("Rave_followingId_fkey", ["followingId"], {})
@Entity("rave", { schema: "testing" })
export class Rave {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column("int", { name: "followerId" })
  followerId: number;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column("int", { name: "followingId" })
  followingId: number;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User, (user) => user.followers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "followerId", referencedColumnName: "id" }])
  follower: User;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "followingId", referencedColumnName: "id" }])
  following: User;
}

