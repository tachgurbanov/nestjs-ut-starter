import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../../user/account/entities/account.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Account, (account) => account.roles)
  account: Account;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  permissions: Permission[];
}
