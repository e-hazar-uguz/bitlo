import { Component } from '@angular/core';
import { BalancesService } from './balances.service';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
  providers: [DecimalPipe]
})
export class BalancesComponent {

title='BAKİYELER'
show='Düşük Bakiyeleri Göster';
hide='Düşük Bakiyeleri Gizle';
balanceData:any;
showLowBalances = true;
balances: any = [];
filteredBalances: any= [];

    constructor(
      private balancesService: BalancesService,
      private decimalPipe: DecimalPipe,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      if(localStorage.length>0){
      let infos = JSON.parse(localStorage.getItem('userData') || '');
      this.balancesService.setLoginUser(infos.user);
      this.getAllBalances();
      }
      else{
        this.router.navigate(['access-message']);
      }
    }
  
    getAllBalances(){
      this.balancesService.getAllBalances().subscribe(res=>{
        if(res){
          res.map((data: any) => {
            let deneme = {
              availableAmount: (data.availableAmount =this.decimalPipe.transform(data.availableAmount, '1.2-2')),
              availableAmountTRYValue: (data.availableAmountTRYValue =this.decimalPipe.transform(data.availableAmountTRYValue, '1.2-2'))
            };
            return deneme;
          });
          this.balanceData=res
          this.filterBalances();
      }
      });
    }

    filterBalances() {
      if (this.showLowBalances) {
        this.filteredBalances = this.balanceData.filter((b:any) => b.availableAmountTRYValue > '1');
      } else {
        this.filteredBalances = this.balanceData;
      }
    }

}
