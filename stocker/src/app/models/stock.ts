export class Stock {
    symbol: string;
    amount: number;
    price: number;
    profit: number;

    constructor(){
        this.price = 0;
        this.profit = 0;
    }
}