export class MoneyTransferDTO {
    email: string;
    amount: number;

    constructor(email: string, amount: number) {
        this.email = email;
        this.amount = amount;
    }
}