import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoneyTransferDTO } from 'src/app/models/moneyTransferDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-take-out-money',
  templateUrl: './modal-take-out-money.component.html',
  styleUrls: ['./modal-take-out-money.component.scss']
})
export class ModalTakeOutMoneyComponent implements OnInit {

  @Input() user: string;
  amountToTransfer: number;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
  }

  async takeOutMoney(){
    let negativeAmountToTransfer: number = this.amountToTransfer * -1;
    let transfer: MoneyTransferDTO = new MoneyTransferDTO(this.user, negativeAmountToTransfer);
    await this.userService.moneyTransfer(transfer).toPromise();
    this.activeModal.close('transferred');
  }

}
