import { gql } from 'apollo-server';
import sinon from 'sinon';
import { query, server, connectMongo, disconnectMongo } from '../helper/QueryUtil';
import { Product, ProductModel } from '../../src/models';
import { ProductProvider } from '../../src/providers';
import { MongoDataSource } from 'apollo-datasource-mongodb';


beforeAll(async () => {
    await connectMongo();
});

afterAll(async (done) => {
    await disconnectMongo();
    await server.stop();
    done();
});

describe('product query', () => {
    describe('when get product by id', () => {
        const GET_PRODUCT = gql(`
            query product($id: ID!){
                getProduct(id: $id) {
                    id
                    title
                    price {
                        bestPrice
                        listPrice
                    }
                }
            }
        `);

        let idProduct: string;
        beforeEach(async () => {
            const product: Product = { title: 'Xablau', price: { listPrice: 99.9 } };
            const pm = await new ProductModel(product).save();
            idProduct = pm.id;
        });

        afterEach(async () => {
            await ProductModel.deleteMany({}).exec();
        });

        describe('and succeeds', () => {
            it('should return product object', async () => {
                const response = await query({
                    query: GET_PRODUCT,
                    variables: {
                        id: idProduct,
                    },
                });
                expect(response.data.getProduct).toEqual({
                    id: idProduct,
                    title: 'Xablau',
                    price: {
                        bestPrice: null,
                        listPrice: 99.9
                    }
                });
            });

            it('should raise an exception', async () => {
                const response = await query({
                    query: GET_PRODUCT,
                    variables: {
                        id: 'suuuuuuuuuuuuuuuuuuuuuuuuper wrong',
                    },
                });
                expect(response.errors).not.toBeUndefined();
            });
        });

        describe('and fails', () => {

            beforeEach(() => {
                sinon.stub(ProductProvider.prototype, 'get').throwsException(new Error('fake exception'));
            });

            afterEach(() => {
                sinon.restore();
            });

            it('should return an error message', async () => {
                const response = await query({
                    query: GET_PRODUCT,
                    variables: {
                        id: idProduct,
                    },
                });
                expect(response.errors[0].message).toEqual('fake exception');
            });
        });
    });

    describe('when get products', () => {
        const GET_PRODUCTS = gql(`
            query {
                getProducts {
                    title
                    price {
                        bestPrice
                        listPrice
                    }
                }
            }
        `);

        beforeEach(async () => {
            const product1: Product = { title: 'Xablau', price: { listPrice: 99.9 } };
            const product2: Product = { title: 'DarthV', price: { listPrice: 1000 } };
            await ProductModel.insertMany([product1, product2]);
        });

        afterEach(async () => {
            await ProductModel.deleteMany({}).exec();
        });

        describe('and succeeds', () => {
            it('should return array of products', async () => {
                const response = await query({
                    query: GET_PRODUCTS,
                    variables: {},
                });
                expect(response.data.getProducts[0].title).toEqual('Xablau');
                expect(response.data.getProducts[1].title).toEqual('DarthV');
            });
        });

        describe('and fails', () => {

            beforeEach(() => {
                sinon.stub(ProductModel, 'find').throwsException(new Error('fake exception'));
            });

            it('should return an error message', async () => {
                const response = await query({
                    query: GET_PRODUCTS,
                    variables: {},
                });
                expect(response.errors[0].message).toEqual('fake exception');
            });
        });
    });

    describe('when create products', () => {
        const CREATE_PRODUCT = gql(`
            mutation($product: ProductInput) {
                createProduct(product: $product) {
                    title
                    price {
                        bestPrice
                        listPrice
                    }
                }
            }
        `);

        afterEach(async () => {
            await ProductModel.deleteMany({}).exec();
        });

        describe('and succeeds', () => {
            it('should return product object', async () => {
                const response = await query({
                    query: CREATE_PRODUCT,
                    variables: {
                        product: {
                            title: 'xpto',
                            price: {
                                listPrice: 200.00,
                                bestPrice: 100.00
                            }
                        }
                    },
                });
                expect(response.data.createProduct).toEqual({
                    title: 'xpto',
                    price: {
                        listPrice: 200.00,
                        bestPrice: 100.00
                    },
                });
            });
        });

        describe('and fails', () => {

            beforeEach(() => {
                sinon.stub(ProductModel, 'create').throwsException(new Error('fake exception'));
            });

            it('should return an error message', async () => {
                const response = await query({
                    query: CREATE_PRODUCT,
                    variables: {
                        product: {
                            title: 'xpto',
                            price: {
                                listPrice: 200.00,
                                bestPrice: 100.00
                            },
                        },
                    },
                });
                expect(response.errors[0].message).toEqual('fake exception');
            });
        });
    });

    describe('when update product attributes', () => {
        const UPDATE_PRODUCT = gql(`
            mutation($id: ID!, $attributes: [AttributeInput]) {
                updateProductAttributes(id: $id, attributes: $attributes) {
                    title
                    price {
                        bestPrice
                        listPrice
                    }
                    attributes {
                        slug
                        values
                    }
                }
            }
        `);

        const UPDATE_PRODUCT_WITHOUT_ATTRIBUTE = gql(`
            mutation($id: ID!) {
                updateProductAttributes(id: $id) {
                    title
                    price {
                        bestPrice
                        listPrice
                    }
                    attributes {
                        slug
                        values
                    }
                }
            }
        `);

        let idProduct: string;
        beforeEach(async () => {
            const product: Product = { title: 'Xurumelas', price: { listPrice: 999.99 } };
            const pm = await new ProductModel(product).save();
            idProduct = pm.id;
        });

        afterEach(async () => {
            await ProductModel.deleteMany({}).exec();
            sinon.restore();
        });

        describe('and succeeds', () => {
            it('should return product object', async () => {
                const response = await query({
                    query: UPDATE_PRODUCT,
                    variables: {
                        id: idProduct,
                        attributes: [
                            {
                                slug: 'cor',
                                values: ['azul', 'preto']
                            },
                            {
                                slug: 'voltagem',
                                values: ['110', '220']
                            }
                        ]
                    },
                });
                expect(response.data.updateProductAttributes).toEqual({
                    title: 'Xurumelas',
                    price: {
                        listPrice: 999.99,
                        bestPrice: null
                    },
                    attributes: [
                        {
                            slug: 'cor',
                            values: ['azul', 'preto']
                        },
                        {
                            slug: 'voltagem',
                            values: ['110', '220']
                        }
                    ]
                });
            });

            it('should return null object when attribute is null', async () => {
                const response = await query({
                    query: UPDATE_PRODUCT,
                    variables: {
                        id: idProduct,
                        attributes: null,
                    },
                });
                expect(response.data.updateProductAttributes).toBeNull();
            });

            it('should return empty attribute when attribute is not sent', async () => {
                const response = await query({
                    query: UPDATE_PRODUCT_WITHOUT_ATTRIBUTE,
                    variables: {
                        id: idProduct
                    },
                });
                expect(response.data.updateProductAttributes.attributes).toEqual([]);
            });
        });

        describe('and fails', () => {

            beforeEach(() => {
                sinon.stub(ProductModel, 'findByIdAndUpdate').throwsException(new Error('fake exception'));
            });

            afterEach(() => {
                sinon.restore();
            });

            it('should return an error message', async () => {
                const response = await query({
                    query: UPDATE_PRODUCT,
                    variables: {
                        id: idProduct,
                        attributes: [
                            {
                                slug: 'att',
                                values: ['1', '2']
                            }
                        ],
                    },
                });
                expect(response.errors[0].message).toEqual('fake exception');
            });
        });
    });
});
