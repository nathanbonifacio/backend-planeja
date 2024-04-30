/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

const dataSouce = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'planeja',
  migrations: [`${__dirname}/migrations/*.ts`]
});

export default dataSouce;
