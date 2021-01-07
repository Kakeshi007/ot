import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { OtService } from 'src/app/service/ot.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-createotnormal',
  templateUrl: './createotnormal.component.html',
  styleUrls: ['./createotnormal.component.css']
})
export class CreateotnormalComponent implements OnInit {

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
      otdate: new FormControl('', Validators.required),
      cycle: new FormControl('', Validators.required),
    });
    this.payroll = this.auth.getPayroll();
    this.formGroupAdd.controls['payroll'].setValue(this.payroll);
  }

  async addOt() {
    let otdate = this.formGroupAdd.get('otdate').value;
    this.formGroupAdd.controls['otdate'].setValue(this.common.convertDate(otdate));
    this.otForm = this.formGroupAdd.getRawValue();
    
    await this.otservice.addOt(this.otForm).then((res: any) => {
      console.log('res',res);
      if(res.ok == true)
      {
        Swal.fire('', 'บันทึกข้อมูลเรียบร้อย', 'success');
        this.formGroupAdd.controls['otdate'].reset();
        //this.formGroupAdd.controls['cycle'].reset();
      }
      else{
        Swal.fire('', 'ข้อมูลซ้ำ', 'error');
        return;
      }
    }).catch(err => {
      console.log('add ot error! ', err.error);
      Swal.fire('', 'เกิดข้อผิดพลาด ไม่สามารถทำรายการได้. ' + err.error, 'error');
    });
  }
}
