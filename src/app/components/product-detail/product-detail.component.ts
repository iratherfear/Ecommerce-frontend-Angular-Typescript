import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartServiceService
  ){}

  ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.handleProductDetail();
      });
  }

  handleProductDetail() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductDetail(productId).subscribe(
      data => this.product = data
    )
  }

  addToCart(product: Product) {
    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }
}
