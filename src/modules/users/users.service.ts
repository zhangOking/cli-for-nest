import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { PhotoEntity } from '../photo/photo.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find({ relations: ['photos'] });
  }

  async create(user) {
    const { name } = user;
    const u = await getRepository(UsersEntity).findOne({ where: { name } });

    if (u) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          error: 'name must be unique.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const photo1 = new PhotoEntity()
      photo1.url = user.photos[0]
      await this.connection.manager.save(photo1);

      const photo2 = new PhotoEntity()
      photo2.url = user.photos[1]
      await this.connection.manager.save(photo2);

      const newUser = new UsersEntity()
      newUser.name = user.name
      newUser.password = user.password
      newUser.status = user.status
      newUser.photos = [photo1, photo2]

      await this.connection.manager.save(newUser);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async createMany(users: UsersEntity[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      users.forEach(async user => {
        await queryRunner.manager.getRepository(UsersEntity).save(user);
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log("🚀 ~ file: users.service.ts ~ line 72 ~ UsersService ~ create ~ err", err)
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
