import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { MercuriusDriverConfig } from '@nestjs/mercurius';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<MercuriusDriverConfig> | MercuriusDriverConfig {
    return {
      subscription: true,
      graphiql: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'graphql.schema.ts'),
        outputAs: 'class',
      },
    };
  }
}
