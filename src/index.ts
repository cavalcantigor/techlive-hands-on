import { ApolloServer } from 'apollo-server-express';
import express from 'express';

// tslint:disable-next-line: no-unused-expression
(() => {
    try {
        const app = express();
        const server = new ApolloServer({});

        server.applyMiddleware({ app, path: '/graphql' });

        app.listen(3002, () => {
            console.error('error');
        });
    } catch (err) {
        console.error(err);
    }
});
