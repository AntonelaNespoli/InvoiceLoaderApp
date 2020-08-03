import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  formInvoiceLoader: FormGroup;
  submitted = false;
  invoices = [];

  existInvoice = false;
  //TODO:
  // CREAR LAS TABLAS DE INVOICES Y CARGARLAS, falta la de mobile

  constructor(private formBuilder: FormBuilder, private router: Router) {
    //if exist invoices in the localStorage, charge the table
    this.invoices = JSON.parse(localStorage.getItem('invoices'));
  }

  ngOnInit(): void {
    //load the form controls
    this.formInvoiceLoader = this.formBuilder.group({
      invoiceId: ['', [Validators.required, Validators.maxLength(8)]],
      net: ['', Validators.required],
      taxPercent: [-1],
      tax: [''],
      total: [''],
    });
    }

  //this is for call from in the html
  get f() {
    return this.formInvoiceLoader.controls;
  }

  //add invoice or clear form
  onSubmit() {
    var buttonName = document.activeElement.getAttribute('Name');
    //if user press add, verify the form validations
    //else user press clear, clear the form and flags
    if (buttonName == 'add') {
      this.submitted = true;
      // stop here if form is invalid
      if (this.formInvoiceLoader.invalid) {
        return;
      }
      //if form valid, add invoice
      this.addInvoice();
    }else{
      this.clear();
    }
  }

  //When inputs net or tax percent are change calculate the total
  onChanges(): void {
    //get the net and tax percent
    let net: number = Number(this.formInvoiceLoader.get('net').value);
    let taxPercent: number = this.formInvoiceLoader.get('taxPercent').value;
    taxPercent = taxPercent == -1 ? 21 : taxPercent;
    let total : number = 0;
    let tax: number = 0;

    //claculate total and tax amount
    total = net * (1 + taxPercent / 100);
    tax = total - net;

    //set the controls: total, tax
    //and tax percent (this is because when the user don't select the percent, the default value is 21% and is important show this to the user)
     this.formInvoiceLoader.controls.total.setValue(new Intl.NumberFormat("de-DE").format(Number(total.toFixed(2))));
     this.formInvoiceLoader.controls.taxPercent.setValue(taxPercent);
     this.formInvoiceLoader.controls.tax.setValue(new Intl.NumberFormat("de-DE").format(Number(tax.toFixed(2))));
     this.formInvoiceLoader.controls.net.setValue(new Intl.NumberFormat("de-DE").format(Number(net.toFixed(2))));
  }

  //Clear the form and the flags
  clear() {
    this.submitted = false;
    this.existInvoice = false;
    this.formInvoiceLoader.reset({
      invoiceId: '',
      net: '',
      taxPercent: -1,
      tax: '',
      total: '',
    });
  }

  addInvoice() {
    //get invoices from localStorage
    this.invoices = localStorage.getItem('invoices') != null ? JSON.parse(localStorage.getItem('invoices')) : [];
    //load the new invoice data
    let invoice: any = {
      invoiceId: this.formInvoiceLoader.get('invoiceId').value,
      net: this.formInvoiceLoader.get('net').value,
      taxPercent: this.formInvoiceLoader.get('taxPercent').value,
      tax: this.formInvoiceLoader.get('tax').value,
      total: this.formInvoiceLoader.get('total').value
    };

    //verify if exist this invoice in the list
    this.existInvoice = false;
    this.invoices.forEach(inv => {
      if(inv.invoiceId == invoice.invoiceId)
        this.existInvoice = true;
    });

    //if not exist, add to the list, update the localStorage, and clear the form
    if (!this.existInvoice) {
      this.invoices.push(invoice);
      localStorage.removeItem('invoices');
      localStorage.setItem('invoices', JSON.stringify(this.invoices));
      this.clear();
    }
  }

  removeInvoice(invoiceId: number){
    //select the invoice for delete
    let invoice: any = this.invoices.find(inv => inv.invoiceId == invoiceId);
    //delete the invoice
    this.invoices = this.invoices.filter(x => x !== invoice);
    //update the localStorage
    localStorage.removeItem('invoices');
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }

  processAndContinue(){
    //navigate to process and result page
    this.router.navigate(['/invoicesProcessed']);
  }
}
