import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoneyTransferDTO } from 'src/app/models/moneyTransferDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-add-money',
  templateUrl: './modal-add-money.component.html',
  styleUrls: ['./modal-add-money.component.scss']
})
export class ModalAddMoneyComponent implements OnInit {

  @Input() user: string;
  amountToTransfer: number;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
  }

  async addMoney() {
    let transfer: MoneyTransferDTO = new MoneyTransferDTO(this.user, this.amountToTransfer);
    await this.userService.moneyTransfer(transfer).toPromise();
    this.activeModal.close('transferred');
  }

}
