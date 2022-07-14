import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';
import { Role } from '../../role/entities/role.entity';
import { PermissionActionEnum } from '../../common/types';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PermissionActionEnum,
  })
  action: PermissionActionEnum;

  @ManyToOne(() => Subject, (subject) => subject.permissions)
  subject: Subject;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinColumn()
  roles: Role[];
}
