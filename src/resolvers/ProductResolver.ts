import { Product, ProductModel } from '../models';

export default {
    Mutation: {
        createProduct: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product> => {
            try {
                const { product } = args;
                return ProductModel.create(product);
            } catch (err) {
                throw new Error(err);
            }
        },
        updateProductAttributes: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product> => {
            try {
                const { id, attributes = [] } = args;
                if (id && attributes) {
                    return ProductModel.findByIdAndUpdate(
                        { _id: id },
                        { attributes },
                        { new: true }
                    ).exec();
                }
                return null;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Query: {
        getProducts: async (): Promise<Product[]> => {
            try {
                return ProductModel.find().exec();
            } catch (err) {
                throw new Error(err);
            }
        },
        getProduct: async (
            parent: any,
            args: any,
            context: any,
            info: any
        ): Promise<Product> => {
            try {
                const {id} = args;
                return ProductModel.findOne({ _id: id }).exec();
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
