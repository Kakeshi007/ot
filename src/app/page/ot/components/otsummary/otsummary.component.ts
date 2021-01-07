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

  colspan: any;
  days = new Array();
  morningData: [];
  affternoonData: [];
  nightData: [];
  
  morningArr = new Array();
  affternoonArr = new Array();
  nightArr = new Array();

  morningCount: number;
  affternoonCount: number;
  nightCount: number;
  sumall: number;

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
    private auth: AuthService,
  ) { }

  async ngOnInit() {
    this.days = this.getDayOfMonth(12, 2020);
    this.colspan = this.days.length;
    // get data from service
    this.morningData = await  this.getOtnormalAll('11956', 2021, 1, 1);
    this.affternoonData = await this.getOtnormalAll('11956', 2021, 1, 2);
    this.nightData = await this.getOtnormalAll('11956', 2021, 1, 3);
    // tranfer data to array
    this.morningArr = await this.getDataOfMonth(1, 2021, this.morningData);
    this.affternoonArr = await this.getDataOfMonth(1, 2021, this.affternoonData);
    this.nightArr = await this.getDataOfMonth(1, 2021, this.nightData);

    this.morningCount =  this.morningData.length;
    this.affternoonCount = this.affternoonData.length;
    this.nightCount =  this.nightData.length;
    this.sumall = this.morningCount + this.affternoonCount + this.nightCount;
  }

  getOtnormalAll(payroll: string, year: number, month: number, cycle: number) {
    return this.otservice.getOtnormalAll(payroll, year, month, cycle).toPromise().then(res => {
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

  getDataOfMonth(month: any, year: any, data: any)
  {
    let numberOfDay = new Date(year, month, 0).getDate();
    let dataReturn = new Array();
    for(let i = 1; i< numberOfDay; i++)
    {
      let id = this.getIdOtdate(i, data);
      dataReturn.push({day:i, id:id});
    }
    return dataReturn;
  }

  getIdOtdate(day: any, data: any)
  {
    let index = data.findIndex(x => x['date'] === day);
    let id = index > -1 ? data[index].id : '';
    //console.log('id', id);
    return id;
  }
}
