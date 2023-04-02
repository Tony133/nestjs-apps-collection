import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Roles } from '../../roles/entities/roles.entity';
import { Posts } from '../../posts/entities/posts.entity';

@Entity()
@ObjectType()
export class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ length: 60 })
  password: string;

  @JoinTable()
  @ManyToMany(() => Roles, (roles) => roles.users, {
    cascade: true,
  })
  roles?: Roles[];

  @ManyToOne(() => Posts, (posts) => posts.users)
  posts?: Posts;
}
