import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ReferService } from 'src/app/service/refer.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-createrefer',
  templateUrl: './createrefer.component.html',
  styleUrls: ['./createrefer.component.css']
})
export class CreatereferComponent implements OnInit {

  payroll = '';
  otdate: any;
  otForm: any;
  formGroupAdd: FormGroup;
  hospital: [];

  constructor(
    private rout: ActivatedRoute,
    private referService: ReferService,
    private auth: AuthService,
    private common: CommonService
  ) { }

  async ngOnInit(){
    this.formGroupAdd = new FormGroup({
      payroll: new FormControl(''),
      referdate: new FormControl('', Validators.required),
      refertime: new FormControl('', Validators.required),
      reciveat: new FormControl(''),
      distance: new FormControl(''),
      hospitalbegin: new FormControl(''),
      hospitalend: new FormControl(''),
      rate: new FormControl(''),
    });
    this.payroll = this.auth.getPayroll();
    this.formGroupAdd.controls['payroll'].setValue(this.payroll);
    this.hospital =  await this.getHospital();
  }

  async addRefer() {
    let referdate = this.formGroupAdd.get('referdate').value;
    this.formGroupAdd.controls['referdate'].setValue(this.common.convertDate(referdate));
    this.otForm = this.formGroupAdd.getRawValue();
    
    await this.referService.addRefer(this.otForm).then((res: any) => {
      console.log('res',res);
      if(res.ok == true)
      {
        Swal.fire('', 'บันทึกข้อมูลเรียบร้อย', 'success');
        this.formGroupAdd.controls['referdate'].reset();
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

  getHospital()
  {
    return this.referService.getHospital().toPromise().then(res => {
      return res['rs'];
    });
  }

}
