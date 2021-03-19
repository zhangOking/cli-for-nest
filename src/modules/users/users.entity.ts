import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhotoEntity } from '../photo/photo.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column('varchar')
  password: string;

  @Column()
  status: number;

  // 建立一对多的关系
  @OneToMany(() => PhotoEntity, photo => photo.user)
  photos: Array<PhotoEntity>;
}
