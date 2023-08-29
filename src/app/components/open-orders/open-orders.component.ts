import { Component } from '@angular/core';
import { OpenOrdersService } from './open-orders.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css'],
  providers: [DatePipe,DecimalPipe]
})
export class OpenOrdersComponent {

openOrderData:any;
title='AÇIK EMİRLER'
  constructor(
    private openOrdersService: OpenOrdersService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(localStorage.length>0){
    let infos = JSON.parse(localStorage.getItem('userData') || '');
    this.openOrdersService.setLoginUser(infos.user);
    this.getAllOpenOrders();
    }
    else{
      this.router.navigate(['access-message']);
    }
  }

  getAllOpenOrders(){
    this.openOrdersService.getAllOpenOrders().subscribe(res=>{
      if(res){
        res.map((data: any) => {
          let deneme = {
            orderDate:data.orderDate = this.datePipe.transform(data.orderDate,'dd/MM/yyyy HH:mm:ss'),
            price: (data.price =this.decimalPipe.transform(data.price, '1.2-2'))
          };
          return deneme;
        });
      this.openOrderData=res
    }
    });
  }

}



