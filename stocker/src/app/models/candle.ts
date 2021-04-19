export class Candle {
    o: number[];
    h: number[];
    l: number[];
    c: number[];
    v: number[];
    t: number[];
    s: string;

    constructor(o: number[], h: number[], l: number[], c: number[], v: number[], t: number[], s: string) {
        this.o = o;
        this.h = h;
        this.l = l;
        this.c = c;
        this.v = v;
        this.t = t;
        this.s = s;
    }
}