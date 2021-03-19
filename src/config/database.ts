import { join } from 'path';
export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'todolist',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true, // 同步锁
};
