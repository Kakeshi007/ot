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

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getOtnormalAll();
  }

  async getOtnormalAll(){
    await this.otservice.getOtnormalAll().then((res: any)=>{
      console.log(res);
      if(res.ok == true)
      {
        
      }else{

      }

    });
  }
}
