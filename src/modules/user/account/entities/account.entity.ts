import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../authorization/role/entities/role.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column('bool', { default: 0 })
  superuser?: boolean;

  @OneToMany(() => Role, (role) => role.account, { nullable: true })
  roles: Role[];

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
