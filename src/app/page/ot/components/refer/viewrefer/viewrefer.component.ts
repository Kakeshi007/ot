import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ReferService } from 'src/app/service/refer.service';
import { CommonService} from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewrefer',
  templateUrl: './viewrefer.component.html',
  styleUrls: ['./viewrefer.component.css']
})
export class ViewreferComponent implements OnInit {

  id: number;
  payroll: number;
  referdate: any;
  refertime: any;
  reciveat: string;
  distance: any;
  hospitalbegin: any;
  hospitalend: any;
  rate: any;

  constructor(
    private rout: ActivatedRoute,
    private referservice: ReferService,
    private common: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rout.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.getOtnormalById(this.id);
  }

  async getOtnormalById(id: any){
    await this.referservice.getReferById(id).then((res: any)=>{
      console.log(res);
      if(res.ok == true)
      {
        this.payroll =  res.rs[0].payroll;
        this.referdate = this.common.convertDateThai(res.rs[0].referdate);
        this.refertime = res.rs[0].refertime;
        this.reciveat = res.rs[0].reciveat;
        this.distance = res.rs[0].distance;
        this.hospitalbegin = res.rs[0].hospitalbegin;
        this.hospitalend = res.rs[0].hospitalend;
        this.rate = res.rs[0].rate;
        console.log('reciveat',this.reciveat);
      }else{
        console.log("error");
      }

    });
  }

  async deleteRefer(id)
  {
    await Swal.fire({
      title: 'ต้องการลบรายการนี้หรือไม่?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then((result) =>  {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

         this.referservice.deleteRefer(id).then((res: any) => {
          console.log('res',res['ok']);
          if(res['ok'] == true)
          {
            Swal.fire('', 'ลบข้อมูลเรียบร้อย', 'success');
            this.router.navigateByUrl('/ot/summary');
          }
          else{
            Swal.fire('', 'ลบไม่สำเร็จ', 'error');
          }
        }).catch(err => {
          console.log('delete ot error! ', err.error);
          Swal.fire('', 'เกิดข้อผิดพลาด ไม่สามารถทำรายการได้. ' + err.error, 'error');
        });

      } else if (result.isDenied) {
        Swal.fire('Don\'t delete', '', 'info')
      }
    });
  }

}
