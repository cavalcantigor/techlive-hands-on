export default interface Provider {

    get(...args: any[]): Promise<any>;

    getAll(): Promise<any[]>;

    create(...args: any[]): Promise<any>;

    update(...args: any[]): Promise<any>;
}
