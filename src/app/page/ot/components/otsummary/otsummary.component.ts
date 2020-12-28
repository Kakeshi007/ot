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
  data: any;

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.data = this.otservice.getOtnormalAll();
    console.log("data", this.data);
    this.days = this.getDayOfMonth(12, 2020);
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
}
