import { ProductProvider } from './providers';
import { Product, ProductModel } from './models';

const dataSources = () => ({
    productProvider: new ProductProvider(ProductModel.collection),
});

export default dataSources;
