import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from 'src/users/entities/user.entity';


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
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "followerId", referencedColumnName: "id" }])
  follower: User;

  @Field(() => User, { description: 'Example field (placeholder)' })
  @ManyToOne(() => User, (user) => user.followings, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "followingId", referencedColumnName: "id" }])
  following: User;
}

