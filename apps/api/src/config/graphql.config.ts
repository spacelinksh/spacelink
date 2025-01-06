import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/app/graphql/schema.gql'),
      playground: false,
      installSubscriptionHandlers: true,
      context: (ctx) => {
        return ctx;
      },
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
    };
  }
}
