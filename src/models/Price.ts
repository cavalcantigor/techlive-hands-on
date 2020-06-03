import { prop } from '@typegoose/typegoose';

export default class Price {

    @prop()
    public bestPrice?: number;

    @prop()
    public listPrice: number;
}
