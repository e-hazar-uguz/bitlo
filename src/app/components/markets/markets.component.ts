import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MarketsService } from './markets.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css'],
  providers:[DecimalPipe]
})
export class MarketsComponent implements OnInit {
  marketsData: any;
  dtOptions: any;
  title = 'MARKETLER';
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  detailValue: any = [];
  logo:any;
  logoBaseURL = "https://static.bitlo.com/cryptologossvg/";
  dataLoaded = false;
  changedMarketCode:any;
  change24hPercentInfo:any
  currentQuoteInfo:any
  currentQuoteLessInfo:any
  averagePrice:any;
  maxIncreaseInfo:any;
  maxDecreaseInfo:any;
  convertPrice:any

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private marketsService: MarketsService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.dtOptions = {
      paging: true,
      info: true,
      autoWidth: true,
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: '<lf<t>ip>',
      destroy: true,
      order: [0, 'asc'],
      searching: true,
    };
    this.getAllMarkets();
  }

  getAllMarkets() {
    this.marketsService.getAllMarkets().subscribe((data) => {
      if (data) {
      data.map((data: any) => {
        let deneme = {
          //marketCode:(data.marketCode =data.marketCode.replace('-', ' / ')),
          currentQuote: (data.currentQuote =this.decimalPipe.transform(data.currentQuote, '1.2-2')),
          change24h: (data.change24h =this.decimalPipe.transform(data.change24h, '1.2-2')),
          highestQuote24h: (data.highestQuote24h =this.decimalPipe.transform(data.highestQuote24h, '1.2-2')),
          lowestQuote24h: (data.lowestQuote24h =this.decimalPipe.transform(data.lowestQuote24h, '1.2-2')),
          url:(data.marketCode =data.marketCode.split('/')[0])
        };
        return deneme;
      });
      this.dataLoaded = true;
        this.marketsData = data;
        this.tableInfo();
        this.dtTrigger.next(null);
      }
    });
  }

  cancel() {
    let ref = document.getElementById('cancel');
    ref?.click();
  }


  detailData(row: any) {
    if (this.marketsData) {
      this.marketsData.forEach((item: any) => {
        if (item) {
          if (row == item.marketCode) {
            this.changedMarketCode = item.marketCode.replace('-', ' / ');
            this.detailValue = item ? item : '';
            this.logo=this.logoBaseURL + this.changedMarketCode.split("/")[0].trim().toLowerCase()+'.svg';
          }
        }
      });
    }
    return this.detailValue;
  }

  tableInfo(){
    let change24hPercentInfoTemp = this.marketsData.filter((b:any) => b.change24hPercent > '0');
    this.change24hPercentInfo = change24hPercentInfoTemp.length;
   
    let currentQuoteInfoTemp = this.marketsData.filter((b:any) => b.currentQuote>'10,000');
    this.currentQuoteInfo = currentQuoteInfoTemp.length;

    let currentQuoteLessInfoTemp =  this.marketsData.filter((b:any) => b.currentQuote<'1,00');
   this.currentQuoteLessInfo = currentQuoteLessInfoTemp.length;

   const totalQuote = this.marketsData.reduce((total:any, market:any) => total + parseFloat(market.currentQuote), 0);
    let x = totalQuote / this.marketsData.length;
    this.averagePrice=x.toFixed(3);

  let highestChange24hPercent = parseFloat(this.marketsData[0].change24hPercent);
  let highestChangeMarketCode = this.marketsData[0].marketCode;

for (const item of this.marketsData) {
    const change24hPercent = parseFloat(item.change24hPercent);
    const a = item.marketCode;
    if (change24hPercent > highestChange24hPercent) {
        highestChange24hPercent = change24hPercent;
        highestChangeMarketCode = a
    }
}
this.maxIncreaseInfo=highestChangeMarketCode

let lowestChange24hPercent = parseFloat(this.marketsData[0].change24hPercent);
let lowestChangeMarketCode = this.marketsData[0].marketCode;
for (const item of this.marketsData) {
  const cc = parseFloat(item.change24hPercent);
  if (cc < lowestChange24hPercent) {
    lowestChange24hPercent = cc;
    lowestChangeMarketCode = item.marketCode;   
  }
}
this.maxDecreaseInfo= lowestChangeMarketCode;

let BTC = this.marketsData.filter((b:any) => b.marketCode ==='BTC-TRY');
let btcCurrentQuote= BTC[0].currentQuote.replace(",", "")
let USDT = this.marketsData.filter((b:any) => b.marketCode ==='USDT-TRY');
let usdtCurrentQuote=USDT[0].currentQuote
this.convertPrice=btcCurrentQuote/usdtCurrentQuote;
}

}
