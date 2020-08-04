import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-totals',
  templateUrl: './table-totals.component.html',
  styleUrls: ['./table-totals.component.sass']
})
export class TableTotalsComponent implements OnInit {

  invoices: any;
  totals: any;

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    //inicialize the totals
    this.totals = {
      totalNet: 0,
      totalTax: 0,
      totalAmount: 0
    };

    //charge the invoices from localStorage
    this.invoices = JSON.parse(localStorage.getItem('invoices'));
    this.calculateTotals();
  }

  //calculate the totals and format the result
  calculateTotals() {
    this.invoices.forEach(inv => {
      this.totals.totalNet += this.numberConvert(inv.net);
      this.totals.totalTax += this.numberConvert(inv.tax);
      this.totals.totalAmount += this.numberConvert(inv.total);
    });
     this.totals.totalNet = this.numberFormat(Number(this.totals.totalNet.toFixed(2)));
     this.totals.totalTax = this.numberFormat(Number(this.totals.totalTax.toFixed(2)));
     this.totals.totalAmount = this.numberFormat(Number(this.totals.totalAmount.toFixed(2)));
  }

  //convert from string (xx, xxx.xx) in to number, in order to use the number to calculate the total
  numberConvert(str: string):number{
    return parseFloat(str.split(".").join("").replace(",", "."));
  }

  //format from number to string (format: xx,xxx.xx) to show it in the view
  numberFormat(n: number):string{
    return new Intl.NumberFormat("de-DE").format(n);
  }

  //open the modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  //if user press delete in modal, delete the data in localStorage and navigate to home view
  deleteAllProcess(){
    //delete invoices from LocalStorage
    localStorage.clear();
    //navigate to home
    this.router.navigate(['/home']);
  }
}
