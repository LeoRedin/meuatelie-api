import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
