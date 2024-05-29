import { DataSource } from 'typeorm';
import { CoffeeRefactor1716945660466 } from './src/migrations/1716945660466-CoffeeRefactor';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [CoffeeRefactor1716945660466],
});
