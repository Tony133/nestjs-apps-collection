import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Users } from '../../users/entities/users.entity';

@Entity()
@ObjectType()
export class Roles {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20 })
  name: string;

  @ManyToMany(
    () => Users,
    users => users.roles,
  )
  users: Users[];
}
