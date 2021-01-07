import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { OtService } from 'src/app/service/ot.service';
import { CommonService} from 'src/app/service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewotnormal',
  templateUrl: './viewotnormal.component.html',
  styleUrls: ['./viewotnormal.component.css']
})
export class ViewotnormalComponent implements OnInit {

  id: number;
  payroll: number;
  otdate: any;
  cycle: string;

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
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
    await this.otservice.getOtnormalById(id).then((res: any)=>{
      console.log(res);
      if(res.ok == true)
      {
        this.payroll =  res.rs[0].payroll;
        
        if(res.rs[0].cycle == 1){
          this.cycle = "เช้า";
        }
        else if(res.rs[0].cycle == 2){
          this.cycle = "เที่ยง";
        }
        else if(res.rs[0].cycle == 3){
          this.cycle = "ดึก";
        }

        this.otdate =  this.common.convertDateThai(res.rs[0].otdate) ;
      }else{
        console.log("error");
      }

    });
  }

  async deleteOt(id)
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

         this.otservice.deleteOt(id).then((res: any) => {
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
