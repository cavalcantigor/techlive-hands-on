import { arrayProp, prop } from '@typegoose/typegoose';

export default class Attribute {

    @prop()
    public slug: string;

    @arrayProp({ items: String })
    public values: string[];
}
