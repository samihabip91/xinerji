import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { AppService } from '../product/services/product.service';
import { IProduct } from '../product/models/product';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';
import { IAutoComplete } from 'src/base/models/autocomplete';
import { IProductAutoComplete } from 'src/product/models/productAutoComplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements IProductAutoComplete, OnInit {

  @ViewChild('autoComplete', {read: ElementRef, static: false}) public autoCompleteEle!: ElementRef; 
  @ViewChild('input') public input!: ElementRef; 
  @ViewChild('productDetail', {read: ViewContainerRef, static: true}) productDetail!: ViewContainerRef;

  @HostListener('click', ['$event'])
  onFocusout(event: any) {
    if(event.target != this.autoCompleteEle.nativeElement && !event.target.classList.contains('product')) {
      this.input.nativeElement.value = "";
      this.autoComplete.hideDropdown();
    }
  }

  public autoComplete!: IAutoComplete;

  public products: IProduct[] = [];
  public isVisible = false;
  isEndOfList = false;

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    // var keyups = fromEvent($("#input"), "keyup").pipe(
    //   debounceTime(750),
    //   distinctUntilChanged(),
    //   filter(f => (f.target as any).value.length >= 6)
    //   ...
    // ).subscribe(result => {

    // });

    this.autoComplete = {
      hideDropdown: () => {
        this.isVisible = false;
      }
    };
  }

  extendProducts = () => {
    this.appService.getProductsByName(this.input.nativeElement.value, this.products.length).then(result => {
      this.isEndOfList = result.products.length == 0;

      this.products.push(...result.products);
    });
  };

  fillProducts = (val: string) => {
    this.appService.getProductsByName(val, 0).then(result => {
      this.products = result.products;

      this.isVisible = this.products.length > 0;
    });
  };

  createProductDetail = (product: IProduct) => {
    this.productDetail.clear();
    const generatedComponent = this.productDetail.createComponent(ProductDetailComponent);
    generatedComponent.setInput('model', product);
  }

  clear = () => {
    this.products = [];
    this.isVisible = false;

    this.productDetail.clear();
  }

  onInput() {
    this.isEndOfList = false;
    var val = this.input.nativeElement.value;

    if(val.length >= 3) {
      this.fillProducts(val);
    }
    else if(val == "") {
      this.clear();
    }
    else
      this.autoComplete.hideDropdown();
  }

  onScroll(event: any) {
    if(!this.isEndOfList) {
  
      // visible height - border + pixel scrolled >= total height 
      if (event.target.offsetHeight - 2 + event.target.scrollTop >= event.target.scrollHeight) {
        this.extendProducts();
      }
    }
  }

  detail(product: IProduct) {
    this.input.nativeElement.value = product.title;
    this.autoComplete.hideDropdown();

    this.createProductDetail(product);
  }
}
