import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { OtService } from 'src/app/service/ot.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';

@Component({
  selector: 'app-updateotnormal',
  templateUrl: './updateotnormal.component.html',
  styleUrls: ['./updateotnormal.component.css']
})
export class UpdateotnormalComponent implements OnInit {

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
    this.formGroupAdd = new FormGroup({
      payroll: new FormControl(''),
      otdate: new FormControl(''),
      cycle: new FormControl(''),
    });
    this.payroll = this.auth.getPayroll();
    this.formGroupAdd.controls['payroll'].setValue(this.payroll);
  }

  async updateOt() {
    let id = 25;
    let otdate = this.formGroupAdd.get('otdate').value;
    this.formGroupAdd.controls['otdate'].setValue(this.common.convertDate(otdate));
    this.otForm = this.formGroupAdd.getRawValue();
    
    await this.otservice.updateOt(this.otForm, id).then((res: any) => {
      //console.log('res',res);
      if(res.ok == true)
      {
        Swal.fire('', 'แก้ไขข้อมูลเรียบร้อย', 'success');
        this.formGroupAdd.reset();
      }
      else{
        Swal.fire('', 'บันทึกไม่สำเร็จ', 'error');
        return;
      }
    }).catch(err => {
      console.log('add ot error! ', err.error);
      Swal.fire('', 'เกิดข้อผิดพลาด ไม่สามารถทำรายการได้. ' + err.error, 'error');
    });
  }

}
