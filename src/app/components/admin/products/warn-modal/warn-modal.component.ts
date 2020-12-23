import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-warn-modal',
  templateUrl: './warn-modal.component.html',
  styleUrls: ['./warn-modal.component.css'],
})
export class WarnModalComponent {
  product: Product;
  constructor(public activeModal: NgbActiveModal) {}

  delete() {
    this.activeModal.close(this.product);
  }
}
