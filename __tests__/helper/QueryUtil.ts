import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import config from 'config';
import mongoose from 'mongoose';
import dataSources from '../../src/datasources';
import logger from '../../src/commons/Logger';
import resolvers from '../../src/resolvers';
import { typeDefs } from '../../src/schema';


export const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  cache: new RedisCache(),
  playground: false,
  introspection: false
});

export async function connectMongo() {
  const { host, database } = config.get('mongodb');
  await mongoose.connect(`mongodb://${host}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 1000,
    connectTimeoutMS: 1000
  }, () => {
    logger.info('mongodb connected...');
  });
}

export async function disconnectMongo() {
  if (mongoose.connection) {
    await mongoose.disconnect();
  }
}

export const { query } = createTestClient(server);
