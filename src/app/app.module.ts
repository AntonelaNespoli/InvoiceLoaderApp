import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './components/form/form.component';
import { TableInvoicesComponent } from './components/table-invoices/table-invoices.component';
import { TableTotalsComponent } from './components/table-totals/table-totals.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableInvoicesComponent,
    TableTotalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
