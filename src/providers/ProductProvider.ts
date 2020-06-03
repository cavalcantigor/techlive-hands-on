import Provider from './IProvider';
import { Attribute, Product, ProductModel } from '../models';
import { DataSource } from 'apollo-datasource';


export default class ProductProvider extends DataSource implements Provider {

    public constructor() {
        super();
    }

    public create(product: Product): Promise<Product> {
        try {
            return ProductModel.create(product);
        } catch (err) {
            throw new Error(err);
        }
    }

    public update(id: string, attributes: Attribute[]): Promise<Product> {
        try {
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

    public get(id: string): Promise<Product> {
        try {
            return ProductModel.findOne({ _id: id }).exec();
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Product[]> {
        try {
            return ProductModel.find().exec();
        } catch (err) {
            throw new Error(err);
        }
    }
}
