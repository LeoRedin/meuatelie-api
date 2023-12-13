import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  databaseConfig,
  postgresConnectionUri,
} from './configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
      connectionUri: postgresConnectionUri,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
