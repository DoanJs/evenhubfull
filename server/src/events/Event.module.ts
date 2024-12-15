import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventsResolver, EventsService } from '.';

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
