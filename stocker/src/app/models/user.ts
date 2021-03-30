import { TradableStock } from './tradablestock';

export class User {
    name: string;
    balance: number;
    unusedBalance: number;
    ownedStocks: TradableStock[];
    watchlistedStocks: TradableStock[];
}