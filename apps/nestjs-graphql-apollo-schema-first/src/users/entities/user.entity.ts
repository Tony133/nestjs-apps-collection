import { Article } from '../../articles/entities/article.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ length: 60 })
  password: string;

  @ManyToOne(() => Article, (article) => article.users)
  articles?: Article;

  @JoinTable()
  @ManyToMany(() => Roles, (roles) => roles.users, {
    cascade: true,
  })
  roles?: Roles[];
}
