import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { OtService } from 'src/app/service/ot.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';

@Component({
  selector: 'app-deleteotnormal',
  templateUrl: './deleteotnormal.component.html',
  styleUrls: ['./deleteotnormal.component.css']
})
export class DeleteotnormalComponent implements OnInit {

  private result: any;
  payroll = '';
  otdate: any;
  otForm: any;
  formGroupAdd: FormGroup;

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
    private auth: AuthService,
    private common: CommonService
  ) { }

  ngOnInit(){

  }

  async deleteOt(id)
  {
    await Swal.fire({
      title: 'ต้องการลบรายการนี้หรือไม่?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.otservice.deleteOt(id).then((res: any) => {
          console.log('res',res['ok']);
          if(res['ok'] == true)
          {
            Swal.fire('', 'ลบข้อมูลเรียบร้อย', 'success');
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
