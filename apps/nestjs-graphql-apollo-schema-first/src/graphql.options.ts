import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
    return {
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './graphql.schema.ts'),
        outputAs: 'class',
      },
    };
  }
}
