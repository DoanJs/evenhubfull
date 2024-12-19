import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Position } from './Position.model';
import { PositionsService } from './Position.service';

@Resolver(() => Position)
@UseGuards(GraphQLGuard)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  @Query(() => [Position])
  positions(): Promise<Position[]> {
    return this.positionsService.positions();
  }

  // relation
}
