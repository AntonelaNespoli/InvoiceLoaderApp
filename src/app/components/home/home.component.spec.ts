import { async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let home: HomeComponent;
  let formBuilder : FormBuilder;
  let router: Router;

  beforeEach(async(()=>{
    home = new HomeComponent(formBuilder, router);
    formBuilder = new FormBuilder();
  }));

  //test to onChanges()
  it('Test to onChanges(): The formInvoiceLoader.controls.total result is "12,38"', async(() => {
    home.formInvoiceLoader = formBuilder.group({
      invoiceId: ['1', [Validators.required, Validators.maxLength(8)]],
      net: ['10,23', Validators.required],
      taxPercent: [21],
      tax: [''],
      total: ['']
    });

    home.onChanges();
    expect(home.formInvoiceLoader.controls.total.value).toEqual('12,38');
  }));

  it('Test to onChanges(): The formInvoiceLoader.controls.tax result is "2,15"', async(() => {
    home.formInvoiceLoader = formBuilder.group({
      invoiceId: ['1', [Validators.required, Validators.maxLength(8)]],
      net: ['10,23', Validators.required],
      taxPercent: [21],
      tax: [''],
      total: ['']
    });

    home.onChanges();
    expect(home.formInvoiceLoader.controls.tax.value).toEqual('2,15');
  }));

  //test addInnvoice()
  it('Test to addInvoice(): The result is add a invoice', async(() => {
    localStorage.clear();

    home.formInvoiceLoader = formBuilder.group({
      invoiceId: [1, [Validators.required, Validators.maxLength(8)]],
      net: ['10,23', Validators.required],
      taxPercent: [21],
      tax: ['2,15'],
      total: ['12,38']
    });

    home.addInvoice();
    home.invoices = JSON.parse(localStorage.getItem('invoices'));
    expect(home.invoices.length).toEqual(1);
  }));

  it('Test to addInvoice(): The result is add two invoices', async(() => {
    home.formInvoiceLoader = formBuilder.group({
      invoiceId: [2, [Validators.required, Validators.maxLength(8)]],
      net: ['10,23', Validators.required],
      taxPercent: [21],
      tax: ['2,15'],
      total: ['12,38']
    });

    home.addInvoice();
    home.invoices = JSON.parse(localStorage.getItem('invoices'));
    expect(home.invoices.length).toEqual(2);
  }));


  //test removeInvoice()
  it('Test to removeInvoice(): The invoiceId result is  2', async(() => {
    home.removeInvoice(1);
    home.invoices = JSON.parse(localStorage.getItem('invoices'));
    expect(home.invoices[0].invoiceId).toEqual(2);
  }));

    //test removeInvoice()
    it('Test to removeInvoice(): The result is 0 invoices', async(() => {
      home.removeInvoice(2);
      home.invoices = JSON.parse(localStorage.getItem('invoices'));
      expect(home.invoices.length == 0).toEqual(true);
    }));

});
