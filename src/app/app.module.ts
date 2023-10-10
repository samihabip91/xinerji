import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from '../product/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
