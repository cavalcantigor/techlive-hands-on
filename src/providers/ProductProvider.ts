import Provider from './IProvider';
import { Attribute, Product, ProductModel } from '../models';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectID } from 'mongodb';


export default class ProductProvider extends MongoDataSource<Product> implements Provider {

    public constructor(collection: any) {
        super(collection);
    }

    public create(product: Product): Promise<Product> {
        try {
            return ProductModel.create(product);
        } catch (err) {
            throw err;
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
            throw err;
        }
    }

    public async get(id: string): Promise<Product> {
        try {
            const objID = new ObjectID(id);
            const product = await this.findOneById(objID, { ttl: 60 });
            return Object.assign({}, product, { id });
        } catch (err) {
            throw err;
        }
    }

    public async getAll(): Promise<Product[]> {
        try {
            return ProductModel.find().exec();
        } catch (err) {
            throw err;
        }
    }
}
