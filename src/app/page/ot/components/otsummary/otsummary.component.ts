import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OtService } from 'src/app/service/ot.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';

@Component({
  selector: 'app-otsummary',
  templateUrl: './otsummary.component.html',
  styleUrls: ['./otsummary.component.css']
})
export class OtsummaryComponent implements OnInit {

  days = new Array();
  arr =  [1,5,9,12,15,16];
  datas: [];

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
    private auth: AuthService,
  ) { }

  async ngOnInit() {
    this.datas = await  this.getOtnormalAll();
    this.days = this.getDayOfMonth(12, 2020);
    console.log('datas', this.datas);
  }

  getOtnormalAll() {
    return this.otservice.getOtnormalAll().toPromise().then(res => {
      return res['rs'];
    });
  }

  getDayOfMonth(month: any, year: any)
  {
    let numberOfDay = new Date(year, month, 0).getDate();
    let dayReturn = new Array();
    for(let i = 1; i< numberOfDay; i++)
    {
      dayReturn.push(i);
    }
   
    return dayReturn;
  }

  getIndexOfDay(day: any)
  {
    return this.datas.findIndex(x => x['otdate'] === day) > -1 ? true : false;
  }
}
