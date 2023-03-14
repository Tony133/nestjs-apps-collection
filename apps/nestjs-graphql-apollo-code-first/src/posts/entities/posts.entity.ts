import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Users } from '../../users/entities/users.entity';

@Entity()
@ObjectType()
export class Posts {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @OneToMany(
    () => Users,
    users => users.posts,
    {
      cascade: true,
    },
  )
  users: Users[];
}
