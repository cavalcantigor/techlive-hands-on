import { Product } from '../models';
import { IProvider } from '../providers';

export default {
    Mutation: {
        createProduct: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product> => {
            const { product } = args;
            const { productProvider }: { productProvider: IProvider } = context.dataSources;
            return productProvider.create(product);
        },
        updateProductAttributes: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product> => {
            const { id, attributes = [] } = args;
            const { productProvider }: { productProvider: IProvider } = context.dataSources;
            return productProvider.update(id, attributes);
        }
    },
    Query: {
        getProducts: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product[]> => {
            const { productProvider }: { productProvider: IProvider } = context.dataSources;
            return productProvider.getAll();
        },
        getProduct: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product> => {
            const { id } = args;
            const { productProvider }: { productProvider: IProvider } = context.dataSources;
            return productProvider.get(id);
        },
    },
};
