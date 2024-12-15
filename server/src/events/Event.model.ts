import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Events' })
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_EventID' })
  @Field()
  EventID: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  locationTitle: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  locationAddress: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  imageUrl: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  price: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  category: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  date: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  startAt: Date;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  endAt: Date;

  // relation

  @ManyToOne(() => User, (user) => user.author_events, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'authorId',
    foreignKeyConstraintName: 'FK_authorId_Events',
  })
  @Field((types) => User, { nullable: true })
  author: User;

  @ManyToMany(() => User, (user) => user.user_events, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'Events_Users',
    joinColumn: {
      name: 'EventID',
      foreignKeyConstraintName: 'FK_EventID_Events_Users',
    },
    inverseJoinColumn: {
      name: 'UserID',
      foreignKeyConstraintName: 'FK_UserID_Events_Users',
    },
  })
  users: [User];
}

//   users: [],
