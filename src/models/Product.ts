import { Attribute, Price } from './index';
import { arrayProp, prop, getModelForClass } from '@typegoose/typegoose';

export class Product {
    @prop({ required: true })
    public id?: string;

    @prop({ required: true })
    public title: string;

    @prop()
    public price?: Price;

    @arrayProp({ items: Attribute })
    public attributes?: Attribute[];
}

export default getModelForClass(Product, {
    schemaOptions: { id: false }
});
