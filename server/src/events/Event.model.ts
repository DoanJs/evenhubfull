import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Events' })
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_EventID' })
  @Field()
  EventID: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  Name: string;

  // relation
}
