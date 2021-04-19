import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/app/models/transaction';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-sell',
  templateUrl: './modal-sell.component.html',
  styleUrls: ['./modal-sell.component.scss']
})
export class ModalSellComponent implements OnInit{
  
  @Input() stockName: string;
  @Input() userName: string
  @Input() ownedAmount: number;
  @Input() price: number;
  
  amountToSell: number = 0;
  sum: number = 0;

  ngOnInit(): void {};

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {}

  async sell() {
    console.log("eladjuk: " + this.stockName)
    let transaction : Transaction = new Transaction(this.userName, this.stockName, this.amountToSell, this.price);
    await this.userService.sell(transaction).toPromise();
    this.activeModal.close('sold');
  }

  calcSum() {
    this.sum = this.amountToSell * this.price;
  }

  allOut() {
    this.amountToSell = this.ownedAmount;
    this.calcSum();
  }
}
