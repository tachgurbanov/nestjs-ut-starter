import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Permission, (permission) => permission.subject)
  permissions: Permission[];
}
