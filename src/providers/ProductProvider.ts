import Provider from './IProvider';
import { Attribute, Product, ProductModel } from '../models';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { KeyValueCache } from 'apollo-server-caching';
import { ObjectID } from 'mongodb';
import _ from 'lodash';


export default class ProductProvider extends DataSource implements Provider {

    private cache: KeyValueCache;

    public constructor() {
        super();
    }

    public initialize(config: DataSourceConfig<any>) {
        this.cache = config.cache;
    }

    public async create(product: Product): Promise<Product> {
        try {
            product.id = new ObjectID().toHexString();
            const newProduct = await ProductModel.create(product);
            if (!_.isEmpty(newProduct)) {
                this.cache.set(`product:${product.id}`, JSON.stringify(newProduct), { ttl: 60 });
            }
            return newProduct;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async update(id: string, attributes: Attribute[]): Promise<Product> {
        try {
            if (id && attributes) {
                const product = await ProductModel.findOneAndUpdate(
                    { id },
                    { attributes },
                    { new: true }
                ).exec();
                if (!_.isEmpty(product)) {
                    this.cache.set(`product:${product.id}`, JSON.stringify(product), { ttl: 60 });
                }
                return product;
            }
            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async get(id: string): Promise<Product> {
        try {
            const cachedProduct = await this.cache.get(`product:${id}`);
            if (cachedProduct) {
                return JSON.parse(cachedProduct);
            } else {
                const product = await ProductModel.findOne({ id }).exec();
                if (!_.isEmpty(product)) {
                    this.cache.set(`product:${id}`, JSON.stringify(product), { ttl: 60 });
                }
                return product;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Product[]> {
        try {
            const cachedProducts = await this.cache.get('product:all');
            if (cachedProducts) {
                return JSON.parse(cachedProducts);
            } else {
                const products = await ProductModel.find().exec();
                if (!_.isEmpty(products)) {
                    this.cache.set(`product:all`, JSON.stringify(products), { ttl: 60 });
                }
                return products;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}
