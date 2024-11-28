import { Module } from '@nestjs/common';
import { EventsResolver, EventsService } from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsResolver, EventsService],
  exports: [],
})
export class EventModule {}
