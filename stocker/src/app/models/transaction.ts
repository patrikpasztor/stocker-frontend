export class Transaction {
    user: string;
    stock: string;
    amount: number;
    stockPrice: number;

    constructor(user: string, stock: string, amount: number, stockPrice: number){
        this.user = user;
        this.stock = stock;
        this.amount = amount;
        this.stockPrice = stockPrice;
    }
}