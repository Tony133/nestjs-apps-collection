import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { User } from './user.entity';

@Table
export class UserRole extends Model {

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @BelongsTo(() => Role)
  role: Role;


  @ForeignKey(() => Role)
  @PrimaryKey
  @Column
  roleId: number;
}
