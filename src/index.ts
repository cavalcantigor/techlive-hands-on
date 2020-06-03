import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import logger from './commons/Logger';
import dataSources from './datasources';
import resolvers from './resolvers';
import { typeDefs } from './schema';

// tslint:disable-next-line: no-unused-expression
(() => {
    try {
        const app = express();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            cache: new RedisCache({
                host: '127.0.0.1',
                port: 6379
            }),
            dataSources,
            playground: true,
            introspection: true
        });

        server.applyMiddleware({ app, path: '/graphql' });

        app.listen(5000, () => {
            const { host, database } = config.get('mongodb');
            mongoose.connect(`mongodb://${host}/${database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }, () => {
                logger.info('mongodb connected');
            });
            logger.info('starting application...');
        });
    } catch (err) {
        logger.error(
            {
                message: 'error on startup',
                error: err.stack
            }
        );
    }
})();
