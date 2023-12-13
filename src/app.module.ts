import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),

    // Modules
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
