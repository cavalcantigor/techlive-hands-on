import { gql } from 'apollo-server';

export const typeDefs = gql(`
    type Query {
        getProduct(id: ID!): Product @cacheControl(maxAge: 240)
        getProducts: [Product]
    }

    type Mutation {
        createProduct(product: ProductInput): Product
        updateProductAttributes(id: ID!, attributes: [AttributeInput]): Product
    }

    input ProductInput {
        title: String!
        price: PriceInput!
    }

    type Product {
        id: ID!
        title: String!
        price: Price!
        attributes: [Attribute]
    }

    type Price {
        bestPrice: Float
        listPrice: Float!
    }

    input PriceInput {
        bestPrice: Float
        listPrice: Float!
    }

    type Attribute {
        slug: String
        values: [String]
    }

    input AttributeInput {
        slug: String!
        values: [String]!
    }
`);
