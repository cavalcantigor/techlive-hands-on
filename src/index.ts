import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import resolvers from './resolvers';
import { typeDefs } from './schema';
import logger from './commons/Logger';

// tslint:disable-next-line: no-unused-expression
(() => {
    try {
        const app = express();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
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
