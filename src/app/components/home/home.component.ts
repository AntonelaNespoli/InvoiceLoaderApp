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

  //TODO:
  // VERIFICAR QUE NO EXISTAN INVOICES EN EL LOCALSTORAGE
  // CREAR LAS TABLAS DE INVOICES Y CARGARLAS

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formInvoiceLoader = this.formBuilder.group({
      invoiceId: ['', [Validators.required, Validators.maxLength(8)]],
      net: ['', Validators.required],
      tax: [21],
      total: [''],
    });
    }

  get f() {
    return this.formInvoiceLoader.controls;
  }

  onSubmit() {
    var buttonName = document.activeElement.getAttribute('Name');
    if (buttonName == 'add') {
      this.submitted = true;
      // stop here if form is invalid
      if (this.formInvoiceLoader.invalid) {
        return;
      }
    }
    this.addInvoice();
    this.clear();
  }

  onChanges(): void {
    let net: number = this.formInvoiceLoader.get('net').value;
    let tax: number = this.formInvoiceLoader.get('tax').value;
    tax = tax.toString() =='Select Tax %' ? 21 : tax;
    let total : number = 0;

    total = net * (1 + tax / 100);
    this.formInvoiceLoader.controls.total.setValue(new Intl.NumberFormat("de-DE").format(Number(total.toFixed(2))));
  }

  clear() {
    this.submitted = false;
    this.formInvoiceLoader.reset({
      invoiceId: '',
      net: '',
      tax: 21,
      total: '',
    });
  }

  addInvoice() {
    let invoices: any = localStorage.getItem('invoices') != null ? JSON.parse(localStorage.getItem('invoices')) : [];
    let invoice: any = {
      invoiceId: this.formInvoiceLoader.get('invoiceId').value,
      net: this.formInvoiceLoader.get('net').value,
      tax: this.formInvoiceLoader.get('tax').value,
      total: this.formInvoiceLoader.get('total').value
    };

    invoices.push(invoice);

    localStorage.removeItem('invoices');
    localStorage.setItem('invoices', JSON.stringify(invoices));

    //cargar tabla
  }

  processAndContinue(){
    this.router.navigate(['/invoicesProcessed']);
  }
}
