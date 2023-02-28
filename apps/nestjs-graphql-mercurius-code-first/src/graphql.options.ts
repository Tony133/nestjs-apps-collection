import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { MercuriusDriverConfig } from '@nestjs/mercurius';
@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<MercuriusDriverConfig> | MercuriusDriverConfig {
    return {
      autoSchemaFile: './schema.gql',
      subscription: true,
      graphiql: true,
    };
  }
}
