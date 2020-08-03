import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {

  formInvoiceLoader: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

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

  clear() {
    this.submitted = false;
    this.formInvoiceLoader.reset();
  }

  addInvoice() {}

  onChanges(): void {
    let net: number = this.formInvoiceLoader.get('net').value;
    let tax: number = this.formInvoiceLoader.get('tax').value;
    tax = tax.toString() =='Select Tax %' ? 21 : tax;
    let total : number = 0;

    total = net * (1 + tax / 100);
    this.formInvoiceLoader.controls.total.setValue(new Intl.NumberFormat("de-DE").format(Number(total.toFixed(2))));
  }
}
