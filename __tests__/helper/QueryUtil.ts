import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import resolvers from '../../src/resolvers';
import { typeDefs } from '../../src/schema';
import config from 'config';
import mongoose from 'mongoose';
import logger from '../../src/commons/Logger';


export const server = new ApolloServer({
  typeDefs,
  resolvers,
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
