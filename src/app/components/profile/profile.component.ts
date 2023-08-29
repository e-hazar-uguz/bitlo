import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {

  title='KULLANICI PROFİLİ'
  profileInfos :any;

  constructor(
    private profileService: ProfileService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(localStorage.length>0){
      let infos = JSON.parse(localStorage.getItem('userData') || '');
      this.profileService.setLoginUser(infos.user);
      this.getMyProfile();
    }
    else{
      this.router.navigate(['access-message']);
    }

  }

  getMyProfile(){
    this.profileService.getMyProfile().subscribe(res=>{
      if(res){
        let dataArray :any=[];
        dataArray.push(res)
        if(dataArray){
          dataArray.map((data: any) => {
            let deneme = {
              updateDate:data.updateDate = this.datePipe.transform(data.updateDate,'dd/MM/yyyy HH:mm:ss')
            };
            return deneme;
          });
          this.profileInfos=res
        }
      }
    })
  }

   formatDate(dateString:any) {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
  
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const monthIndex = parseInt(parts[1], 10) - 1; // 0-11 arasında
      const year = parseInt(parts[0], 10);
  
      if (!isNaN(day) && !isNaN(monthIndex) && !isNaN(year)) {
        const monthName = months[monthIndex];
        return `${day} ${monthName} ${year}`;
      }
    }
  
    return '';
  }

}
