import { async } from '@angular/core/testing';
import { TableTotalsComponent } from './table-totals.component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('TableTotalsComponent', () => {
  let tableTotals: TableTotalsComponent;
  let router: Router;
  let modalServ: NgbModal;

  beforeEach(async(()=>{
    tableTotals = new TableTotalsComponent(router, modalServ);
  }));

    //Test to numberFormat(n number)
    it('Test to numberFormat(n number): The result is 1.002,32', async(() => {
      expect(tableTotals.numberFormat(1002.32)).toEqual('1.002,32');
    }));

    it('Test to numberFormat(n number): The result is 2.302.321,05', async(() => {
      expect(tableTotals.numberFormat(2302321.05)).toEqual('2.302.321,05');
    }));

    //Test to numberConvert(str string)
    it('Test to numberConvert(str string): The result is 2302321.05', async(() => {
      expect(tableTotals.numberConvert('2.302.321,05')).toEqual(2302321.05);
    }));

    it('Test to numberConvert(str string): The result is 1002.32', async(() => {
      expect(tableTotals.numberConvert('1.002,32')).toEqual(1002.32);
    }));

    //test calculateTotals()
    it('Test to calculateTotals(): The result of totals.totalAmount is "17.210"', async(() => {
      tableTotals.invoices = [{
        invoiceId: 1,
        net: "1.000",
        taxPercent: 21,
        tax: "210",
        total: "1.210",
      },
      {
        invoiceId: 2,
        net: "16.000",
        taxPercent: 0,
        tax: "0",
        total: "16.000",
      }
    ];
    tableTotals.totals = {
      totalNet: 0,
      totalTax: 0,
      totalAmount: 0
    };
    tableTotals.calculateTotals();
    expect(tableTotals.totals.totalAmount).toEqual("17.210");
    }));

    it('Test to calculateTotals(): The result of totals.totalNet is "1.033,46"', async(() => {
      tableTotals.invoices = [{
        invoiceId: 1,
        net: "10,23",
        taxPercent: 21,
        tax: "2,15",
        total: "12,38",
      },
      {
        invoiceId: 2,
        net: "1.023,23",
        taxPercent: 10.5,
        tax: "107,44",
        total: "1.130,67",
      }
    ];
    tableTotals.totals = {
      totalNet: 0,
      totalTax: 0,
      totalAmount: 0
    };
    tableTotals.calculateTotals();
    expect(tableTotals.totals.totalNet).toEqual("1.033,46");
    }));

    it('Test to calculateTotals(): The result of totals.totalTax is "109,59"', async(() => {
      tableTotals.invoices = [{
        invoiceId: 1,
        net: "10,23",
        taxPercent: 21,
        tax: "2,15",
        total: "12,38",
      },
      {
        invoiceId: 2,
        net: "1.023,23",
        taxPercent: 10.5,
        tax: "107,44",
        total: "1.130,67",
      }
    ];
    tableTotals.totals = {
      totalNet: 0,
      totalTax: 0,
      totalAmount: 0
    };
    tableTotals.calculateTotals();
    expect(tableTotals.totals.totalTax).toEqual("109,59");
    }));


});
