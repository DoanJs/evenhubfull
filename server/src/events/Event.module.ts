import { Module } from '@nestjs/common';
import { EventsResolver, EventsService } from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '.';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    JwtModule.register({
      secret: process.env.SECRETJWT as string,
    }),
  ],
  providers: [EventsResolver, EventsService],
  exports: [],
})
export class EventModule {}
