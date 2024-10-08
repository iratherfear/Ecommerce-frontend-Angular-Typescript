import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }
}
