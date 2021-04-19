export class WatchlistStock {
    symbol: string;
    price: number;
    todayOpenPrice: number;
    weekAgoOpenPrice: number;

    constructor(symbol: string) {
        this.symbol = symbol;
    }
}