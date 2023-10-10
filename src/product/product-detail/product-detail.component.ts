import { Component, Input, OnInit } from '@angular/core';
// import { NgOptimizedImage } from '@angular/common';
import { IProduct } from 'src/product/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() model!: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
