import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { UserRole } from './user-role.entity';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  surname: string;

  @Column
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
