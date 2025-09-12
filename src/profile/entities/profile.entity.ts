import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ nullable: true })
  kelas: string;

  @Column({ nullable: true })
  jurusan: string;

  @Column({ nullable: true })
  tahunLulus: number;

  @Column({
    type: 'enum',
    enum: ['aktif', 'lulus'],
    default: 'aktif',
  })
  status: 'aktif' | 'lulus';

  @Column({ default: 0 })
  followersCount: number;

  @Column({ default: 0 })
  followingCount: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
