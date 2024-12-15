// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { EventModule } from './events/Event.module';
import { UsersModule } from './users';
import { DataLoaderModule } from './dataloader/Dataloader.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: process.env.USERNAME_MSSQL,
      password: process.env.PASSWORD_MSSQL,
      database: process.env.NAMEDB_MSSQL,
      autoLoadEntities: true,
      logging: true,
      // synchronize: true, ///not use production env
      options: {
        trustServerCertificate: true,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule,
    UsersModule,
    EventModule,
    // DataLoaderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
