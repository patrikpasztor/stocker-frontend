import { TradableStock } from './tradablestock';

export class User {
    name: string;
    balance: number;
    ownedStocks: TradableStock[];
    watchlistedStocks: TradableStock[];
}