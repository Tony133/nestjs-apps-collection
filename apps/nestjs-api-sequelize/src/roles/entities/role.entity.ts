import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/entities/user-role.entity';

@Table
export class Role extends Model {
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
