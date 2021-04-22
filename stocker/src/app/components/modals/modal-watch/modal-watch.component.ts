import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IStockSymbol } from 'src/app/models/stocksymbol';
import { WatchDTO } from 'src/app/models/watchDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-watch',
  templateUrl: './modal-watch.component.html',
  styleUrls: ['./modal-watch.component.scss']
})
export class ModalWatchComponent implements OnInit {

  @Input() stocks: IStockSymbol[];
  selectedStock: string;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    
  }

  async add() {
    let watchDTO = new WatchDTO(this.userService.getLoggedInUsername(), this.selectedStock);
    await this.userService.watch(watchDTO).toPromise();
    this.activeModal.close('added');
  }

}
