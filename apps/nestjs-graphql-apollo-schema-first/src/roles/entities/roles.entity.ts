import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 20 })
    name: string

    @ManyToMany(
      () => User,
      users => users.roles,
    )
    users: User[];    
}
