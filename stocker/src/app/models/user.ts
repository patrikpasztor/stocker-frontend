import { TradableStock } from './tradablestock';
import { Transaction } from './transaction';

export class User {
    name: string;
    balance: number;
    unusedBalance: number;
    ownedStocks: TradableStock[];
    watchlistedStocks: TradableStock[];
    //transactions: Transaction[];
}